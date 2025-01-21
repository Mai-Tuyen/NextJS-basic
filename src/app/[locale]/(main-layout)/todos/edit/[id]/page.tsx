import ToDoUpdateForm from "@/app/[locale]/(main-layout)/todos/edit/[id]/ToDoUpdateForm";

const getToDoDetail = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/todos/${id}`,
    {
      next: {
        tags: ["todos"],
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todo detail");
  }
  return response.json();
};
export default async function TodoEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todoDetail = await getToDoDetail(id);
  return (
    <>
      <h1>Edit Todo</h1>
      <ToDoUpdateForm todoDetail={todoDetail} />
    </>
  );
}
