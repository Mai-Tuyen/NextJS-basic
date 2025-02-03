import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { authConfig } from "./auth.config";
import { jwtDecode } from "jwt-decode";
import authFetchRequest from "./feature/auth/fetchRequest";
import { CustomLoginEntityError, CustomLoginError } from "./feature/auth/type";
import { HTTP_STATUS_CODE } from "./feature/global/enum";
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  console.log("Refreshing access token", token);
  try {
    console.log("Beaarer token", `Bearer ${token.refreshToken}`);

    const response = await fetch(
      `${process.env.API_SERVER_BASE_URL}/api/auth/refresh`,
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );

    console.log(response);

    const tokens = await response.json();

    console.log(tokens);

    if (!response.ok) {
      throw tokens;
    }

    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

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
          expiresInMins: 10,
        });
        console.log("resLoginAuth", res);

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
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // user is only available the first time a user signs in authorized
      // console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);
        // console.log(decodedToken);
        token.accessTokenExpires = decodedToken?.exp  * 1000;
      }

      if (account && user) {
        // console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
        // console.log(`In jwt callback - account is ${JSON.stringify(account)}`);

        return {
          // ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          // user,
        };
      }

      // Return previous token if the access token has not expired yet
      // console.log(
      //   "**** Access token expires on *****",
      //   token.accessTokenExpires,
      //   new Date(token.accessTokenExpires)
      // );
      if (Date.now() < token.accessTokenExpires) {
        // console.log("**** returning previous token ******");
        return token;
      }

      // Access token has expired, try to update it
      // console.log("**** Update Refresh token ******");
      //return token;
      // return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      // console.log(`In session callback - Token is ${JSON.stringify(token)}`);
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
      }
      // console.log(
      //   `In session callback - Session is ${JSON.stringify(session)}`
      // );
      return session;
    },
  },
});
