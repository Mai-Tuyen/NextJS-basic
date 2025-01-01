"use client";
import { debounce } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SearchForm() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    router.push(`${pathName}${q.length > 0 ? `?q=${q}` : ""}`);
  });
  return (
    <input
      type="search"
      placeholder="Search..."
      onChange={handleSearch}
      defaultValue={searchParams?.get("q") ?? ""}
    />
  );
}
