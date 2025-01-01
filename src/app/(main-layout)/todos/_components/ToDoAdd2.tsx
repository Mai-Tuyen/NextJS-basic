"use client";
import { createNewTodo } from "@/app/(main-layout)/todos/action";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Demo xử lý form với server action
export default function ToDoAdd2() {
  const [errorForm, setErrorForm] = useState<string>("");

  const createNewTodoFromServer = async (data: FormData) => {
    debugger;
    const response = await createNewTodo(data);
    if (response && !response?.success) {
      setErrorForm(response!.messsage);
    }
  };
  return (
    <>
      <form action={createNewTodoFromServer}>
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
        <div className="text-red-500">{errorForm}</div>
      </form>
    </>
  );
}
