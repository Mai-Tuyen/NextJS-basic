"use client";

import { useGetPostDetailQuery } from "@/feature/demoTanstackQuery/hook";

export default function Post({ id }: { id: string }) {
  const { data, isPending, error } = useGetPostDetailQuery({
    id,
    enabled: Boolean(id),
  });
  if (isPending) return <div>Loading..</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <h1>{data?.payload.id}</h1>
      <h1>{data?.payload.title}</h1>
      <p>{data?.payload?.body}</p>
    </div>
  );
}
