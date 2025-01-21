"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteTodo({ id }: { id: string }) {
  const router = useRouter();
  const handleDeleteTodo = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/todos/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete todo");
    router.refresh();
  };
  return (
    <Button className="bg-red-600" onClick={() => handleDeleteTodo(id)}>
      Delete
    </Button>
  );
}
