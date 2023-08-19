"use client";
import PostsPage from "@/components/posts/Posts";
import useSWR from "swr";
import { useEffect, useState } from "react";
import fetcher from "@/lib/fetcher";
import PostTab from "@/components/posts/PostTab";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useHomepageQuery from "./hooks/useHomepageQuery";
import { Router } from "next/router";

const Home = () => {
  // const posts = await getData();
  const pathname = usePathname();
  const router = useRouter();
  const homepageQuery = useHomepageQuery();
  const searchParams = useSearchParams();
  let [tab, setTab] = useState(searchParams.get("sort"));

  const {
    data: posts,
    error: postsError,
    isLoading: postsIsLoading,
  } = useSWR(homepageQuery.query, () => fetcher(homepageQuery.query));

  return (
    <div className="">
      <div className="flex items-center justify-center gap-2 pt-6">
        <p className="p-8">hp qu: {homepageQuery.query} </p>
        <PostTab
          tab="recent"
          onSetQuery={() =>
            homepageQuery.setQuery(homepageQuery.query, { sort: "recent" })
          }
          onSetTab={() => setTab("recent")}
          isActive={tab === "recent"}
        />
        <PostTab
          tab="top"
          // onSetQuery={() => setQuery(`/api/post?sort=top`)}
          onSetQuery={() =>
            homepageQuery.setQuery(homepageQuery.query, { sort: "top" })
          }
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
