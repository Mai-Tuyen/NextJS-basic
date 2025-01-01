import FilterForm from "@/app/(main-layout)/products/_components/FilterForm";
import React from "react";

type SearchParamsType = {
  status: string;
  keyword: string;
};

export default async function Product({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const search = await searchParams; // đây là cách lấy searchParams phía server component, với client component hãy dùng useSearchParams()

  return (
    <>
      <div>Status: {search.status}</div>;<div>Keyword: {search.keyword}</div>
      <FilterForm />
    </>
  );
}
