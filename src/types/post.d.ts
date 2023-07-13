type Upvote = {
  postId: string;
  userId: string;
};

type Post = {
  upvoteCount: number;
  id: string;
  title: string;
  image: string;
  upvotes: Upvote[];
};

export default Post;
