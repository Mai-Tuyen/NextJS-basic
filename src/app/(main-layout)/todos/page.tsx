import SearchForm from "@/app/(main-layout)/todos/_components/SearchForm";
import TodoAdd from "@/app/(main-layout)/todos/_components/TodoAdd";
import ToDoAdd2 from "@/app/(main-layout)/todos/_components/ToDoAdd2";
import DeleteTodo from "@/app/(main-layout)/todos/delete/DeleteTodo";
import { Todo } from "@/app/(main-layout)/todos/type";
import { Params, SearchParams } from "@/app/globaltype";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";

const getTodoList = async (q: string = "") => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/todos${
      q?.length > 0 ? `?title=${q}` : ""
    }`,
    {
      // cache: "force-cache",
      next: {
        revalidate: 50,
      },
    }
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
        <div key={todo.id} className="flex justify-between w-[500] mx-5 my-4">
          <Link href="/todos/[id]" as={`/todos/${todo.id}`}>
            Title:{todo.title}
          </Link>
          <div className="todo__action">
            <Link href={`/todos/edit/${todo.id}`}>
              <Button className="bg-cyan-300 mx-3">Edit</Button>
            </Link>
            <DeleteTodo id={todo.id} />
          </div>
        </div>
      ))}
      {/* <TodoAdd />  form add "use client" */}
      <ToDoAdd2 />
    </>
  );
}
