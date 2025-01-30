"use client";
import PostAdd from "@/app/[locale]/(main-layout)/demoTanstackQuery/PostAdd";
import { Button } from "@/components/ui/button";
import { useGetPostsQuery } from "@/feature/demoTanstackQuery/hook";
import Link from "next/link";

export default function PostList() {
  const {
    data,
    isPending,
    isLoading,
    isFetching,
    error,
    refetch: refetchListPost,
  } = useGetPostsQuery();

  if (isPending) return <div>Loading..</div>;
  if (error) return <div>{error.message}</div>;

  const handleReload = () => {
    refetchListPost();
  };

  return (
    <div className="flex gap-5">
      <div className="left">
        <h1>Post List2222</h1>
        <Button onClick={handleReload}>Reload</Button>
        {data?.payload?.map(
          (item: { id: number; title: string; body: string }) => (
            <div key={item.id}>
              <Link href={`/demoTanstackQuery/${item.id}`}>
                {item.id}. {item.title}
              </Link>
            </div>
          )
        )}
      </div>
      <PostAdd />
    </div>
  );
}
