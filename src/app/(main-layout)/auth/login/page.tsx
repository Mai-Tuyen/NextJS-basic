import FormLogin from "@/app/(main-layout)/auth/login/FormLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Login() {
  return (
    <div className="w-1/2 mx-auto">
      <h1>Login</h1>
      <FormLogin />
    </div>
  );
}
