import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
type PostType = {
  id: string;
  title: string;
  imageKey: string | null;
  image: string;
  userId: string;
  upvoteCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET(
  request: Request,
  params: { params: { id: string } }
) {
  // const body = await request.json();
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") as string;

  const user = await prisma.user.findUnique({
    where: { id: params.params.id },
    include: {
      upvotes: {
        include: {
          post: {
            include: {
              upvotes: {
                where: { userId: session?.user.id },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!user)
    return new Response("User not found", {
      status: 401,
    });
  const posts: PostType[] | undefined = user?.upvotes.map(
    (upvote) => upvote.post
  );
  const { upvotes, ...restOfUser } = user;
  const newUser = { ...restOfUser, posts };
  //   console.log(isBanned);
  return NextResponse.json(newUser);
}
