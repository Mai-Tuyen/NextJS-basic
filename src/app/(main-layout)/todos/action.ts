"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createNewTodo = async (data: FormData) => {
  try {
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    if (!title || !content) throw new Error("Missing title or content");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/todos1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, completed: false }),
      }
    );
    if (!response.ok) throw new Error("Failed to create new todo");
    if (response.ok) {
      revalidatePath("/todos");
    }
  } catch (error) {
    return { success: false, messsage: (error as Error).message };
  }
};

export const updateTodoServerAction = async (data: FormData) => {
  try {
    const id = data.get("id");
    const title = (data.get("title") as string).trim();
    const content = (data.get("content") as string).trim();
    const completed = data.get("completed");
    if (!title || !content || !id) {
      throw new Error("Missing title or content or id");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, completed }),
      }
    );
    if (!response.ok) throw new Error("Failed to create new todo");
    if (response.ok) {
      return { success: response.ok, message: "Update to do success" };
    }
  } catch (error) {
    return { success: false, messsage: (error as Error).message };
  }
};
