"use client";

import Post from "@/types/post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { BiSolidCommentDetail, BiSolidUpArrowAlt } from "react-icons/bi";
import PostActions from "./PostActions";

type PropTypes = {
  post: Post;
};
const PostPage: React.FC<PropTypes> = ({ post }) => {
  let [upvoteCount, setUpvoteCount] = useState(post.upvoteCount);
  let [isUpvoted, setIsUpvoted] = useState(post.upvotes.length ? true : false);
  const { data: session, status } = useSession();

  const upvotePost = async (postId: string) => {
    if (status !== "authenticated") return redirect("/api/auth/login");
    const res = await fetch("/api/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });
    const { message, post } = await res.json();
    if (upvoteCount > post.upvoteCount) {
      setIsUpvoted(false);
    } else {
      setIsUpvoted(true);
    }
    setUpvoteCount(post.upvoteCount);
  };

  return (
    <div className="flex flex-col mx-auto gap-2 py-6  ">
      <hr />
      <Link href={`/post/${post.id}`}>
        <h3 className="text-2xl font-semibold py-1">{post.title}</h3>
        <Image src={post.image} alt={post.title} width={680} height={1200} />
      </Link>
      <PostActions
        isUpvoted={isUpvoted}
        upvoteCount={upvoteCount}
        upvotePost={() => upvotePost(post.id)}
        postLink={`/post/${post.id}`}
      />
    </div>
  );
};

export default PostPage;
