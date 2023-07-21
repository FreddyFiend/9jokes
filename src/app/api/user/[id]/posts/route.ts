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
  //   const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") as string;
  const posts = searchParams.get("posts") as string;
  console.log(params);
  const user = await prisma.user.findUnique({
    where: { id: params.params.id },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  //   console.log(isBanned);
  return NextResponse.json(user);
}
