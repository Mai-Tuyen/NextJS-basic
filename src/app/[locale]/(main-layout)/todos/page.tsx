import { Params, SearchParams } from "@/app/[locale]/globaltype";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import SearchForm from "./_components/SearchForm";
import DeleteTodo from "./delete/DeleteTodo";
import { Todo } from "./type";
import ToDoAdd2 from "./_components/ToDoAdd2";
import todoFetchRequest from "@/feature/todo/fetchRequest";

// const getTodoList = async (q: string = "") => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_API}/todos${
//       q?.length > 0 ? `?title=${q}` : ""
//     }`,
//     {
//       // cache: "force-cache",
//       next: {
//         revalidate: 50,
//       },
//     }
//   );
//   if (!response.ok) throw new Error("Có lỗi khi fetch data todos");
//   return response.json();
// };
const getTodoList = async (q: string = "") => {
  const response = await todoFetchRequest.getListTodo(q);
  return response.payload;
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
  const todoList: Todo[] = await getTodoList(q as string);
  return (
    <>
      <h1>Todo List</h1>
      <SearchForm />
      {todoList.map((todo) => (
        <div key={todo.id} className="flex justify-between w-[500] mx-5 my-4">
          <Link href={`/todos/[id]`} as={`/todos/${todo.id}`}>
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
