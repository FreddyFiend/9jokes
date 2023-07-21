import React from "react";
import PostPage from "./Post";
import Post from "@/types/post";

type PropTypes = {
  posts: Post[];
};

const PostsPage: React.FC<PropTypes> = ({ posts }) => {
  return (
    <div className="flex flex-col justify-center ">
      {posts.map((post) => (
        <PostPage post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsPage;
