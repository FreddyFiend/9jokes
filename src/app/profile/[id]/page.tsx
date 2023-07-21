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

function ProfilePageWithId({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  let [tab, setTab] = useState(`posts`);

  let [query, setQuery] = useState(`/api/user/${params.id}/upvotes`);

  const {
    data: user,
    error: postsError,
    isLoading: postsIsLoading,
  } = useSWR(query, () => fetcher(query));

  return (
    <div className="p-6 ">
      <div className="flex flex-row items-center gap-2">
        <h3 className="py-4 text-xl font-semibold"> {user?.name} </h3>
        {session?.user?.id === user?.id && (
          <Link
            className="text-lg font-semibold text-red-500"
            href="/api/auth/signout"
          >
            Sign Out
          </Link>
        )}
      </div>
      {session?.user?.id === user?.id && (
        <Link className="text-lg font-semibold text-sky-500" href="/upload">
          New Post
        </Link>
      )}
      <div className="gap-2 flex justify-center items-center">
        <button
          className={`px-8 py-2 font-medium text-xl ${
            tab === "posts" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => {
            setQuery(`/api/user/${user.id}/posts`);
            setTab("posts");
          }}
        >
          POSTS
        </button>

        <button
          className={`px-8 py-2 font-medium text-xl ${
            tab === "upvotes" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => {
            setQuery(`/api/user/${user.id}/upvotes`);
            setTab("upvotes");
          }}
        >
          UPVOTES
        </button>
      </div>
      <div className="bg-gray-200">
        {postsIsLoading ? <p>Loading....</p> : <PostsPage posts={user.posts} />}
      </div>
    </div>
  );
}

export default ProfilePageWithId;
