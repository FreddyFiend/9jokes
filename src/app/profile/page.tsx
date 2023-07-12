"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import PostsPage from "@/components/Posts";

const fetcher = (query: string) =>
  fetch(`/api/post?${query}`).then((res) => res.json());

const ProfilePage = () => {
  const { data: session } = useSession();
  if (!session) return redirect("/");
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("query", () => fetcher(`user=${session.user.id}`));

  return (
    <div className="p-6 bg-gray-100">
      <Image
        src={session?.user?.image as string}
        alt="profile picture"
        height={160}
        width={160}
        sizes="(max-width: 448px) 50vw, (max-width: 728px) 24vw, 10vw"
      />

      <div className="flex flex-row items-center gap-2">
        <h3 className="py-4 text-xl font-semibold"> {session?.user?.name} </h3>
        <Link
          className="text-lg font-semibold text-red-500"
          href="/api/auth/signout"
        >
          Sign Out
        </Link>
      </div>
      <Link className="text-lg font-semibold text-sky-500" href="/upload">
        New Post
      </Link>
      {isLoading ? <p>Loading....</p> : <PostsPage posts={posts} />}
    </div>
  );
};

export default ProfilePage;
