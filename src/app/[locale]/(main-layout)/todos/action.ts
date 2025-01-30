"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createNewTodo = async (prevState: unknown, data: FormData) => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  try {
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    if (!title || !content) throw new Error("Missing title or content");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/todos`,
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
      revalidatePath(`/${localeCookie?.value || "vi"}/todos`);
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
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
    return { success: false, message: (error as Error).message };
  }
};
