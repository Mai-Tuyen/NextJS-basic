"use server";

import { cookies } from "next/headers";
import { z } from "zod";
export const handleRegisterServerAction = async (
  currentState: unknown,
  formData: FormData
) => {
  const schema = z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(3, "Name must be at least 3 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
    confirm_password: z
      .string()
      .min(1, "Confirm password is required")
      .refine((value) => {
        return value === formData.get("password");
      }, "Confirm password does not match"),
  });
  const validatedFields = schema.safeParse(Object.fromEntries(formData));
  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Register failed",
      errors,
    };
  }

  const response = await fetch(`https://api.escuelajs.co/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      avatar: "https://i.imgur.com/LDOO4Qs.jpg",
    }),
  });
  if (response.ok) {
    return {
      success: true,
      message: "Register success",
    };
  }
  return {
    success: false,
    message: "Register failed",
  };
};

export const handleCancelServerAction = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.set("name", name, { path: "/", httpOnly: true });
  return {
    success: true,
    message: "Cancel success",
  };
};
