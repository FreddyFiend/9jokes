"use client";
import PostsPage from "@/components/posts/Posts";
import useSWR from "swr";
import { useState } from "react";
import fetcher from "@/lib/fetcher";
import PostTab from "@/components/posts/PostTab";

const Home = () => {
  // const posts = await getData();
  let [tab, setTab] = useState(`recent`);

  let [query, setQuery] = useState(`/api/post?sort=recent`);

  const {
    data: posts,
    error: postsError,
    isLoading: postsIsLoading,
  } = useSWR(query, () => fetcher(query));

  return (
    <div className="">
      <div className="flex items-center justify-center gap-2 pt-6">
        <PostTab
          tab="recent"
          onSetQuery={() => setQuery(`/api/post?sort=recent`)}
          onSetTab={() => setTab("recent")}
          isActive={tab === "recent"}
        />
        <PostTab
          tab="top"
          onSetQuery={() => setQuery(`/api/post?sort=top`)}
          onSetTab={() => setTab("top")}
          isActive={tab === "top"}
        />
      </div>

      {postsIsLoading ? (
        <p>Loading....</p>
      ) : postsError ? (
        "Something went wrong, please restart the page"
      ) : (
        <PostsPage posts={posts} />
      )}
      {/* <PostsPage posts={posts} />{" "} */}
    </div>
  );
};
export default Home;
