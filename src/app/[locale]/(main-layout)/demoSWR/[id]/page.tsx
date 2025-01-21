import Post from "@/app/[locale]/(main-layout)/demoSWR/[id]/Post";
import React from "react";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Post id={id} />
    </>
  );
}
