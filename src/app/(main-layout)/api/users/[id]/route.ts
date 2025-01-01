import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  const { id } = params;
  return NextResponse.json({ id: Number(id) }, { status: 200 });
};
