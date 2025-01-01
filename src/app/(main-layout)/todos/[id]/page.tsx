import { Todo } from "@/app/(main-layout)/todos/type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
type Params = {
  params: { id: string };
};

const getTodoDetail = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/todos/${id}`
  );
  if (!response.ok) {
    return null;
  }
  return response.json();
};
export default async function TodoDetail({ params }: Params) {
  const { id } = await params;
  const todoDetail: Todo = await getTodoDetail(id);
  if (!todoDetail) {
    notFound();
  }
  return (
    <>
      <h1>
        Id: {id} Detail: {todoDetail.title}
      </h1>
      <p> Status: {todoDetail.completed}</p>
      <p>Content: {todoDetail.content}</p>
      <Button>
        <Link href="/todos">Back</Link>
      </Button>
    </>
  );
}
