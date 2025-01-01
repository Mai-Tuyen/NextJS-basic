import { NextRequest, NextResponse } from "next/server";
export const GET = async (request: NextRequest) => {
  const keyword = request.nextUrl.searchParams.get("keyword");
  return NextResponse.json({ name: "John Doe", keyword }, { status: 200 });
};
