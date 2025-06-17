import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function GET(
  request: Request,
  params: { params: { id: string } }
) {
  let post = {};

  if (params.params.id === "king") {
    // const body = await request.json();
    // const session = await getServerSession(authOptions);

    post = await prisma.botRegistration.findMany({});
  }
  // console.log(isBanned);
  return NextResponse.json(post);
}
