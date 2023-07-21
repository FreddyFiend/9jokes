import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function GET(
  request: Request,
  params: { params: { id: string } }
) {
  // const body = await request.json();
  // const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { id: params.params.id },
  });
  if (!user)
    return new Response("User not found", {
      status: 401,
    });
  console.log(params);
  // console.log(isBanned);
  return NextResponse.json(user);
}
