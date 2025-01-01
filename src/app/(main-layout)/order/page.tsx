import { redirect } from "next/navigation";
import React from "react";

export default function Order() {
  const isLogin = false;
  if (!isLogin) redirect("/login");
  return <div>Order</div>;
}
