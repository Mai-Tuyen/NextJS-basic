"use client";
import { createNewTodo } from "@/app/[locale]/(main-layout)/todos/action";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
// Demo xử lý form với server action
export default function ToDoAdd2() {
  const initialState = {
    message: "",
    success: false,
  };
  const [state, formAction, isPending] = useActionState(
    createNewTodo,
    initialState
  );

  return (
    <>
      <form action={formAction}>
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
        <Button type="submit" disabled={isPending}>
          Add
        </Button>
        {state?.message && <div className="text-red-500">{state.message}</div>}
      </form>
    </>
  );
}
