import React from "react";
import PostPage from "./Post";
import Post from "@/types/post";

type PropTypes = {
  posts: Post[];
};

const PostsPage: React.FC<PropTypes> = ({ posts }) => {
  return (
    <div className="flex flex-col justify-center  p-1 md:p-4">
      {posts
        ? posts.map((post) => <PostPage post={post} key={post.id} />)
        : "empty"}
    </div>
  );
};

export default PostsPage;
