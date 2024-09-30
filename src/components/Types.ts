export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export type State = {
  posts: Post[];
  selectedPostId: number;
};
export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
export type Detail = {
  comments: Comment[];
};
