"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { handleLoginServerAction } from "./action";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextAuthLoginResponse } from "@/feature/auth/type";
import { HttpError } from "@/feature/global/type";

// Improved schema with additional validation rules
const formSchema = z.object({
  // email: z.string().email({ message: "Invalid email address" }),
  email: z.string(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export default function LoginPreview() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     const formData = new FormData();
  //     formData.append("email", values.email);
  //     formData.append("password", values.password);
  //     setIsLoadingSubmit(true);
  //     const res = await handleLoginServerAction(null, formData);
  //     if (res?.success) {
  //       toast("Login successful");
  //     }
  //     if (!res?.success) {
  //       form.setError("email", { message: res?.message });
  //     }
  //   } catch (error) {
  //     console.error("Form submission error", error);
  //     toast.error("Failed to submit the form. Please try again.");
  //   } finally {
  //     setIsLoadingSubmit(false);
  //   }
  // }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: SignInResponse | undefined = await signIn("credentials", {
        username: values.email,
        password: values.password,
        expiresInMins: 1,
        redirect: false,
      });
      if (!res?.error) {
        router.push("/auth/get-me");
      }
      if (res?.error) {
        const errorLogin: HttpError = JSON.parse(res.code as string);
        toast.error(errorLogin?.payload?.message);
      } else {
        toast("Login successful");
      }
    } catch (error) {
      console.error("Form submission error", error);
    }
  };

  return (
    <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="input"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoadingSubmit}
                >
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
    </div>
  );
}
