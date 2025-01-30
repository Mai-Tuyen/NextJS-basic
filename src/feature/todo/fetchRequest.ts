import { Todo } from "@/app/[locale]/(main-layout)/todos/type";
import fetchBase from "@/libs/fetchBase";

const todoFetchRequest = {
  getListTodo: (q: string = "") =>
    fetchBase.get<Todo[]>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/todos${
        q?.length > 0 ? `?title=${q}` : ""
      }`,
      {
        next: {
          revalidate: 50,
        },
        cache: "force-cache",
      }
    ),
};

export default todoFetchRequest;
