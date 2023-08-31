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
      category: body.category,
    },
  });

  return NextResponse.json({ post: createdPost });
}

export async function GET(request: Request) {
  // const body = await request.json();
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort") as string;
  const category = searchParams.get("category") as string;
  let userId = "";

  if (session?.user?.id) {
    userId = session?.user?.id as string;
  }
  let where = {
    category: category || undefined,
  };
  let orderBy = {};

  if (sort === "top") {
    orderBy = {
      upvoteCount: "desc",
    };
  }
  if (sort === "recent") {
    orderBy = {
      createdAt: "desc",
    };
  }
  const posts = await prisma.post.findMany({
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

  return NextResponse.json(posts);
}
