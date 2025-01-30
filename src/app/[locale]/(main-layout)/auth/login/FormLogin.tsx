"use client";
import { handleLoginServerAction } from "@/app/[locale]/(main-layout)/auth/login/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function FormLogin() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    handleLoginServerAction,
    null
  );
  if (!state?.success) {
    toast.error(state?.message);
  } else if (state?.success) {
    toast.success(state?.message);
  }

  useEffect(() => {
    if (state?.success) {
      const userInfo = state?.data?.userInfo;

      if (userInfo.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [state?.success, router]);

  return (
    <form action={formAction}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <Input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Email..."
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>
        <Input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="password..."
          required
        />
      </div>
      <Button type="submit" disabled={isPending}>
        Đăng nhập
      </Button>
    </form>
  );
}
