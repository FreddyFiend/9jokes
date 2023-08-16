import { User } from "./user";

export type Comment = {
  text: string;
  createdAt: Date;
  userId: string;
  postId: string;
  user: User;
};
