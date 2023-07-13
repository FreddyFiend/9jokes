"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import PostsPage from "@/components/Posts";
import { config } from "process";
import fetcher from "@/lib/fetcher";

// const fetcher = (query: string) => fetch(`${query}`).then((res) => res.json());

const ProfilePage = () => {
  const { data: session } = useSession();
  let [query, setQuery] = useState(`/api/post?user=${session?.user?.id}`);
  if (!session) return redirect("/");
  const { data: posts, error, isLoading } = useSWR(query, () => fetcher(query));

  return (
    <div className="p-6 bg-gray-100">
      <Image
        src={session?.user?.image as string}
        alt="profile picture"
        height={160}
        width={160}
        sizes="(max-width: 448px) 50vw, (max-width: 728px) 24vw, 10vw"
      />
      {JSON.stringify(posts)}

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

      <div className="flex gap-2">
        <button
          className="btn"
          onClick={() => setQuery(`/api/post?user=${session.user.id}`)}
        >
          My Posts
        </button>
        <button
          className="btn"
          onClick={() => setQuery(`/api/upvote?user=${session.user.id}`)}
        >
          My Up Votes
        </button>
      </div>
      {isLoading ? <p>Loading....</p> : <PostsPage posts={posts} />}
    </div>
  );
};

export default ProfilePage;
