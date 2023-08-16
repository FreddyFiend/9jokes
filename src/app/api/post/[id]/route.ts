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

  const post = await prisma.post.findUnique({
    where: { id: params.params.id },
    include: {
      comments: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
          text: true,
          createdAt: true,
        },
      },
    },
  });
  if (!post)
    return new Response("Post not found", {
      status: 404,
    });
  console.log(params);
  // console.log(isBanned);
  return NextResponse.json(post);
}
