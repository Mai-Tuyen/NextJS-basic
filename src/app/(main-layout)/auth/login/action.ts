"use server";

import { cookies } from "next/headers";

const getProfile = async (access_token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_AUTH_API}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return response.json();
};

export const handleLoginServerAction = async (
  currentState: unknown,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_AUTH_API}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  if (!response.ok)
    return {
      success: false,
      message: "Login failed",
    };
  const data = await response.json();
  const access_token = data.access_token;
  const profile = await getProfile(access_token);
  // call api profile after login

  const cookieStore = await cookies();
  cookieStore.set("token", data.access_token, {
    path: "/",
    httpOnly: true,
    maxAge: 86400,
  });
  return {
    success: true,
    message: "Login success",
    data: { ...data, userInfo: profile },
  };
};
