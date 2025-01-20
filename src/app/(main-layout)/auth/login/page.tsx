import FormLogin from "@/app/(main-layout)/auth/login/FormLogin";
import React from "react";
import FormLoginWithReactHookForm from "./FormLoginWithReactHookForm";

export default function Login() {
  return (
    <div className="w-1/2 mx-auto">
      {/* <FormLogin /> */}
    <FormLoginWithReactHookForm />
    </div>
  
  );
}
