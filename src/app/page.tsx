import PostsPage from "@/components/Posts";
import fetcher from "@/lib/fetcher";
import Post from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

function Home({ posts }: { posts: Post[] }) {
  console.log(posts);
  return (
    <div className="">
      {JSON.stringify(posts)}
      {/* <PostsPage posts={posts} />{" "} */}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/post`);
  const posts = await res.json();
  console.log(posts);

  // Pass data to the page via props
  return { props: { posts } };
}
export default Home;
