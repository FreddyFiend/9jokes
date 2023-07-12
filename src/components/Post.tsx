"use client";

import Post from "@/types/post";
import Image from "next/image";
import React, { useState } from "react";
import { BiSolidCommentDetail, BiSolidUpArrowAlt } from "react-icons/bi";

type PropTypes = {
  post: Post;
};
const PostPage: React.FC<PropTypes> = ({ post }) => {
  let [upvoteCount, setUpvoteCount] = useState(post.upvoteCount);

  const upvotePost = async (postId: string) => {
    const res = await fetch("/api/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });
    const { message, post } = await res.json();
    setUpvoteCount(post.upvoteCount);
  };

  return (
    <div className="flex flex-col mx-auto gap-2 py-6">
      <h3 className="text-2xl font-semibold">{post.title}</h3>
      <Image src={post.image} alt={post.title} width={680} height={1200} />

      <div className="buttons flex items-center  gap-2 pt-2">
        <button onClick={() => upvotePost(post.id)} className="bg-gray-200 p-2">
          <BiSolidUpArrowAlt className="text-5xl md:text-6xl" />
        </button>
        <h6 className="bg-gray-200 p-2 text-5xl md:text-6xl"> {upvoteCount}</h6>
        <button className="bg-gray-200 p-2">
          <BiSolidCommentDetail className="text-5xl md:text-6xl" />
        </button>
      </div>
    </div>
  );
};

export default PostPage;
