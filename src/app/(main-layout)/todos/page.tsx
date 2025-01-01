import SearchForm from "@/app/(main-layout)/todos/_components/SearchForm";
import TodoAdd from "@/app/(main-layout)/todos/_components/TodoAdd";
import { Todo } from "@/app/(main-layout)/todos/type";
import { Params, SearchParams } from "@/app/globaltype";
import Link from "next/link";
import React from "react";

const getTodoList = async (q: string = "") => {
  debugger;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/todos${
      q?.length > 0 ? `?title=${q}` : ""
    }`
  );
  if (!response.ok) throw new Error("Có lỗi khi fetch data todos");
  return response.json();
};

export default async function TodoPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const paramsResult = await params;
  const searchParamsResult = await searchParams;
  const q = searchParamsResult.q;

  // console.log("params", paramsResult);
  // console.log("searchParams", searchParamsResult);

  const todoList: Todo[] = await getTodoList(q as string);
  return (
    <>
      <h1>Todo List</h1>
      <SearchForm />
      {todoList.map((todo) => (
        <Link href="/todos/[id]" as={`/todos/${todo.id}`} key={todo.id}>
          <h3>
            <span>
              Title:{todo.title} Content: {todo.content}
            </span>
          </h3>
        </Link>
      ))}
      <TodoAdd />
    </>
  );
}
