import React from "react";

export default async function PostDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return slug?.[0] ? <div>PostDetail</div> : <div>Dont have param</div>;
}
