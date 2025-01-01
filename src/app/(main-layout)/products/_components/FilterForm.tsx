"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function FilterForm() {
  const pathname = usePathname();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const status = formData.get("status") as string;
    const keyword = formData.get("keyword") as string;
    const query = new URLSearchParams({ status, keyword }).toString();
    router.push(`${pathname}?${query}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <select name="status">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input type="search" name="keyword" placeholder="Keyword..." />
      <Button>Filter</Button>
    </form>
  );
}
