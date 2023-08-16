"use client";
import fetcher from "@/lib/fetcher";
import { Comment } from "@/types/comment";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";

const PostPage = ({ params }: { params: { id: string } }) => {
  let [query, setQuery] = useState(`/api/post/${params.id}`);
  let [text, setText] = useState("");
  const {
    data: post,
    error: postError,
    isLoading: postIsLoading,
  } = useSWR(query, () => fetcher(query));

  const postComment = async () => {
    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: params.id, text }),
    });
    const { message, comment } = await res.json();
    console.log(comment);
  };
  if (postIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col mx-auto gap-2 py-6">
      <div className="text-xl font-bold">{post.title}</div>
      <Image src={post.image} alt={post.title} width={680} height={1200} />

      <form
        onSubmit={postComment}
        className="flex justify-center items-center gap-2"
      >
        <input
          className="border-2 px-8 py-4 border-black rounded "
          value={text}
          onChange={(evt) => setText(evt.target.value)}
        ></input>
        <button className="btn" type="submit">
          Comment
        </button>
      </form>

      <div className="comments pt-8">
        <ul>
          {post.comments.map((comment: Comment) => (
            <li className="pt-2">
              <div className="text-lg">{comment.user.name}</div>
              <div className="text-md">{comment.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostPage;
