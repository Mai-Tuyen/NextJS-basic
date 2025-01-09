"use client";
import PostAdd from "@/app/(main-layout)/demoSWR/PostAdd";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSWR, { mutate } from "swr";

export default function PostList() {
  const getPosts = async () => {
    const res = await fetch("http://localhost:3001/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const {
    data: posts,
    isLoading,
    error,
    // mutate,
  } = useSWR("/posts", getPosts, {
    fallbackData: [],
  });

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>{error.message}</div>;

  const handleReload = () => {
    // Cách 1: Gọi mutate local trong phạm vị của useSWR
    // mutate(
    //   (data: { id: number; title: string; body: string }[]) => {
    //     return [...data, { id: 4, title: "test", body: "test" }];
    //   },
    //   {
    //     revalidate: false,
    //   }
    // );

    // Cách 2: Gọi mutate từ global, cách này thì cần có key của useSWR
    mutate(
      "/posts",
      (data?: { id: number; title: string; body: string }[]) => {
        return data && [...data, { id: 4, title: "test", body: "test" }];
      },
      {
        revalidate: false,
      }
    );
  };

  return (
    <div className="flex gap-5">
      <div className="left">
        <h1>Post List</h1>
        <Button onClick={handleReload}>Reload</Button>
        {posts.map((item: { id: number; title: string; body: string }) => (
          <div key={item.id}>
            <Link href={`/demoSWR/${item.id}`}>
              {item.id}. {item.title}
            </Link>
          </div>
        ))}
      </div>
      <PostAdd />
    </div>
  );
}
