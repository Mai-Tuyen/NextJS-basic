import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { authConfig } from "./auth.config";
import { jwtDecode } from "jwt-decode";
import authFetchRequest from "./feature/auth/fetchRequest";
import { CustomLoginEntityError, CustomLoginError } from "./feature/auth/type";
import { HTTP_STATUS_CODE } from "./feature/global/enum";

async function refreshAccessToken(token) {
  console.log("Đã vào hàm refresh token");
  debugger
  // console.log("Refreshing access token", token);
  try {
    // console.log("Beaarer token", `Bearer ${token.refreshToken}`);

    const response = await authFetchRequest.refreshToken({
      refreshToken: token.refreshToken,
      expiresInMins: 10,
    })

    console.log("response refresh token from API",response);

    const tokens = response?.payload;

    console.log("new token in refresh token",tokens);

    if (response.status !== HTTP_STATUS_CODE.OK) {
      console.log("API refresh token không trả về 200")
      throw tokens;
    }

    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log("Đã nhảy vào catch trong refresh token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    // ...authConfig,
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;

        try {
        const res = await authFetchRequest.login({
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 1,
        });

        if ([HTTP_STATUS_CODE.OK, HTTP_STATUS_CODE.CREATED].includes(res?.status)) {
          // accessing the accessToken returned by server
          const accessToken = res?.payload?.accessToken;
          const refreshToken = res?.payload?.refreshToken;

          // You can make more request to get other information about the user eg. Profile details
          // return user credentials together with accessToken
          return {
            accessToken,
            refreshToken,
          };
        }
        return null;
        } catch (e) {
          let errorLogin = JSON.parse(JSON.stringify(e));
          if (errorLogin?.status === HTTP_STATUS_CODE.ENTITY_ERROR) {
            throw new CustomLoginError(errorLogin)
          }
          else {
            throw new CustomLoginEntityError(errorLogin)
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // user is only available the first time a user signs in authorized
      // console.log(`In jwt callback - Token is ${JSON.parse(JSON.stringify(token))}`);

      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);
        // console.log("decodedToken",decodedToken);
        token.accessTokenExpires = decodedToken?.exp  * 1000;
      }

      if (account && user) {
        // console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
        // console.log(`In jwt callback - account is ${JSON.stringify(account)}`);

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          // user,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        console.log("Access Token vẫn còn hạn")
        return token;
      } else {
        console.log("Access Token đã hết hạn")
        return refreshAccessToken(token);
      }
    },
    session: async ({ session, token }) => {
      debugger
      console.log(`In session callback - Token is ${JSON.stringify(token)}`);
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
        session.error = token.error;
      }
      console.log(
        `In session callback - Session is ${JSON.stringify(session)}`
      );
      return session;
    },
  },
});
