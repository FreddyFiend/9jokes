"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import PostsPage from "@/components/posts/Posts";
import fetcher from "@/lib/fetcher";
import PostTab from "@/components/posts/PostTab";

// const fetcher = (query: string) => fetch(`${query}`).then((res) => res.json());

function ProfilePageWithId({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  let [tab, setTab] = useState(`posts`);

  let [query, setQuery] = useState(`/api/user/${params.id}/upvotes`);

  const {
    data: user,
    error: userError,
    isLoading: postsIsLoading,
  } = useSWR(query, () => fetcher(query));

  return (
    <div className="p-6 ">
      {session?.user?.id === user?.id && (
        <div className="text-center text-2xl font-bold">My Profile</div>
      )}
      <div className="flex flex-row items-center gap-2">
        <h3 className="py-4 text-xl font-semibold"> {user?.name} </h3>
      </div>

      <div className="gap-2 flex justify-center items-center">
        <PostTab
          tab="posts"
          onSetQuery={() => setQuery(`/api/user/${params.id}/posts`)}
          onSetTab={() => setTab("posts")}
          isActive={tab === "posts"}
        />

        <PostTab
          tab="upvotes"
          onSetQuery={() => setQuery(`/api/user/${params.id}/upvotes`)}
          onSetTab={() => setTab("upvotes")}
          isActive={tab === "upvotes"}
        />
      </div>

      <div className="">
        {postsIsLoading ? (
          <p>Loading....</p>
        ) : userError ? (
          "User not found"
        ) : (
          <PostsPage posts={user.posts} />
        )}
      </div>
    </div>
  );
}

export default ProfilePageWithId;
