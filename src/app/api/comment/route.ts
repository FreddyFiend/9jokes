import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/home");

  const createdComment = await prisma.comment.create({
    data: {
      text: body.text,
      userId: session.user.id,
      postId: body.postId,
    },
  });

  console.log(createdComment);
  return NextResponse.json({ comment: createdComment });
}
