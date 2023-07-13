import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/home");
  const { postId } = body;
  const upvoteExists = await prisma.upvote.findFirst({
    where: { postId, userId: session.user.id },
  });
  if (!upvoteExists) {
    await prisma.upvote.create({
      data: {
        postId,
        userId: session.user.id,
      },
    });
    const post = await prisma.post.update({
      where: { id: postId },
      data: { upvoteCount: { increment: 1 } },
    });
    return NextResponse.json({ message: "Up voted a post!", post });
  } else {
    await prisma.upvote.deleteMany({
      where: {
        userId: session.user.id,
        postId: body.postId as string,
      },
    });

    const post = await prisma.post.update({
      where: { id: postId },
      data: { upvoteCount: { decrement: 1 } },
    });

    return NextResponse.json({ message: "Deleted an Upvote!", post });
  }
}

export async function GET(request: Request) {
  // const body = await request.json();
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("user") as string;
  const page = searchParams.get("page") as string;

  const createdPost = await prisma.upvote.findMany({
    orderBy: { createdAt: "desc" },
    include: { post: true },
  });
  const resPost = createdPost.map((upvote) => {
    return { ...upvote.post, upvotes: [{ userId: upvote.userId }] };
  });

  console.log(createdPost);
  return NextResponse.json(resPost);
}
