import FormRegister from "@/app/(main-layout)/auth/register/FormRegister";
import React from "react";

export default async function RegisterPage() {
  // trong page luôn luôn nên để là server component kể cả không phức tạp để sau sử dụng 1 số tính năng như metadata, revalidate,...
  return (
    <div className="w-1/2">
      <h1>RegisterPage</h1>
      <FormRegister />
    </div>
  );
}
