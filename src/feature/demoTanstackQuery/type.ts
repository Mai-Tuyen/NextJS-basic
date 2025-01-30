export type Post = {
  id: string;
  title: string;
  body: string;
};

export type UpdatePostTypeRequest = Omit<Post, "id">;
