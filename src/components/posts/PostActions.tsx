"use client";

import Link from "next/link";
import React from "react";
import { BiSolidCommentDetail, BiSolidUpvote } from "react-icons/bi";

type PostActionsProps = {
  isUpvoted: boolean;
  upvotePost: () => void;
  upvoteCount: number;
  postLink: string;
};

const PostActions: React.FC<PostActionsProps> = ({
  isUpvoted,
  upvotePost,
  upvoteCount,
  postLink,
}) => {
  return (
    <div className="buttons flex justify-between items-center   pt-2 w-full">
      <button
        onClick={() => upvotePost()}
        className={`bg-neutral-200 px-4 py-2  rounded-full flex items-center gap-2
        
        `}
      >
        <BiSolidUpvote
          className={`text-2xl md:text-3xl   ${
            isUpvoted ? "text-blue-500" : ""
          }`}
        />
        <h6 className="text-lg font-semibold"> {upvoteCount}</h6>
      </button>

      <Link href={postLink} className="">
        <button className="bg-neutral-200 px-4 py-2  rounded-full flex items-center gap-2">
          <BiSolidCommentDetail className="text-2xl md:text-3xl" />
          <div className="text-lg font-semibold">Comments</div>
        </button>
      </Link>
    </div>
  );
};

export default PostActions;
