import PostsPage from "@/components/Posts";

async function getData() {
  const res = await fetch("http://localhost:3000/api/post");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors

  return res.json();
}

const Home = async () => {
  // const posts = await getData();

  return (
    <div className="">
      <div className="gap-2 flex justify-center items-center">
        {/* <button
          className={`px-8 py-2 font-medium text-xl ${
            tab === "posts" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => {
            setQuery(`/api/post?user=${user.id}`);
            setTab("posts");
          }}
        >
          POSTS
        </button> */}

        {/* <button
          className={`px-8 py-2 font-medium text-xl ${
            tab === "upvotes" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => {
            setQuery(`/api/upvote?user=${user.id}`);
            setTab("upvotes");
          }}
        >
          UPVOTES
        </button> */}
      </div>
      {/* <PostsPage posts={posts} />{" "} */}
    </div>
  );
};
export default Home;
