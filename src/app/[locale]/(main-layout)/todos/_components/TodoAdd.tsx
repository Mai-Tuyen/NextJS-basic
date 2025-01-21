"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
export default function TodoAdd() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const content = form.get("content") as string;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, completed: false }),
      }
    );
    if (response.ok) {
      router.refresh();
      e.currentTarget.reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control"
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          className="form-control"
        />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
