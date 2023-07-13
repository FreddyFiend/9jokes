import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/home");

  const createdPost = await prisma.post.create({
    data: {
      image: body.imageUrl,
      imageKey: body.imageKey,
      userId: session.user.id,
      title: body.title,
    },
  });

  console.log(createdPost);
  return NextResponse.json({ post: createdPost });
}

export async function GET(request: Request) {
  // const body = await request.json();
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("user") as string;
  const upvote = searchParams.get("upvote") as string;
  let userId = "";
  if (session?.user?.id) {
    userId = session?.user?.id as string;
  }

  let where = {};
  let orderBy = {};
  if (upvote) {
    where = { upvotes: { some: { userId: upvote || undefined } } };
    orderBy = {
      upvotes: {
        createdAt: "desc",
      },
    };
  }
  if (id) {
    where = { userId: id || undefined };
  }
  const createdPost = await prisma.post.findMany({
    where,
    include: {
      upvotes: {
        where: {
          userId: userId || undefined,
          // Filter for the specific user ID associated with the upvote
        },
      },
    },
    orderBy,
  });

  console.log(createdPost);
  return NextResponse.json(createdPost);
}