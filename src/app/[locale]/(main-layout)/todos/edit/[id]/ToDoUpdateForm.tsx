"use client";
import { updateTodoServerAction } from "@/app/[locale]/(main-layout)/todos/action";
import { Todo } from "@/app/[locale]/(main-layout)/todos/type";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function ToDoUpdateForm({ todoDetail }: { todoDetail: Todo }) {
  const router = useRouter();
  const [msg, setMsg] = React.useState<string>("");
  return (
    <>
      <form
        action={async (formData: FormData) => {
          formData.append("id", todoDetail.id);
          const response: { success: boolean; message: string } =
            await updateTodoServerAction(formData);
          if (!response.success) {
            setMsg(response.message);
          } else {
            router.push("/todos");
          }
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control"
          defaultValue={todoDetail.title}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          className="form-control"
          defaultValue={todoDetail.content}
        />
        <label className="d-block">
          <input
            type="checkbox"
            name="completed"
            defaultChecked={todoDetail.completed}
          />
          Completed
        </label>
        <Button type="submit">Update</Button>
      </form>
    </>
  );
}
