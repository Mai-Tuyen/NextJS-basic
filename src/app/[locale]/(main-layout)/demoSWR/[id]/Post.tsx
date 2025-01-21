"use client";

import { notFound } from "next/navigation";
import useSWR from "swr";

export default function Post({ id }: { id: string }) {
  type ErrorWithStatus = Error & {
    status?: number;
  };
  const getPostDetail = async ({
    id,
    token,
  }: {
    id: string;
    token: string;
  }) => {
    const header: HeadersInit = {};
    if (token) {
      header["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch("http://localhost:3001/posts/" + id, {
      headers: header,
    });
    if (!res.ok) {
      if (res.status === 404) {
        const error: ErrorWithStatus = new Error("Post not found");
        error.status = res.status;
        throw error;
      }
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const { data, isLoading, error } = useSWR(
    `/posts/${id}`,
    () => getPostDetail({ id, token: "ahihi" }),
    {
      fallbackData: [],
    }
  );
  if (isLoading) return <div>Loading..</div>;
  if (error?.status === 404) return notFound();
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  );
}
