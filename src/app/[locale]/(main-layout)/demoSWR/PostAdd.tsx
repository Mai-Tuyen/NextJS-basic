"use client";

import { Button } from "@/components/ui/button";
import { mutate } from "swr";

export default function PostAdd() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      }
    );
    if (!response.ok) {
      alert("Failed to add new post");
    }
    mutate("/posts");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Title</label>
          <input type="text" name="title" placeholder="Title..." />
        </div>
        <div>
          <label htmlFor="">Body</label>
          <input type="text" name="body" placeholder="Body..." />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
