import React from "react";
import PostPage from "./Post";
import Post from "@/types/post";

type PropTypes = {
  posts: Post[];
};

const PostsPage: React.FC<PropTypes> = ({ posts }) => {
  return (
    <div className="px-1 shadow md:px-2">
      {posts
        ? posts.map((post) => <PostPage post={post} key={post.id} />)
        : "empty"}
    </div>
  );
};

export default PostsPage;
