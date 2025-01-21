"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/post");
  };

  return <Button onClick={handleNavigate}>{children}</Button>;
}
