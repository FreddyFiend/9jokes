"use client";

import React from "react";
import PostPage from "./Post";
import Post from "@/types/post";

type PropTypes = {
  posts: Post[];
};

const PostsPage: React.FC<PropTypes> = ({ posts }) => {
  return (
    <div className="px-1 shadow md:px-2">
      {posts.length > 0 ? (
        posts.map((post) => <PostPage post={post} key={post.id} />)
      ) : (
        <div className=" py-8 text-lg">Empty</div>
      )}
    </div>
  );
};

export default PostsPage;
