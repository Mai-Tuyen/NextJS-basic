"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <div className="text-red-500">{error.message}</div>
      <Button onClick={() => reset()}>Try again</Button>
    </>
  );
}
