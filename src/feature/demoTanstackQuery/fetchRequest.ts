import fetchBase from "@/libs/fetchBase";
import { Post, UpdatePostTypeRequest } from "./type";

const demoTanstackQueryFetchRequest = {
  getPosts: () =>
    fetchBase.get<Post[]>(`${process.env.NEXT_PUBLIC_SERVER_API}/posts`),
  getPostDetail: (id: string) =>
    fetchBase.get<Post>(`${process.env.NEXT_PUBLIC_SERVER_API}/posts/${id}`),
  addPost: (body: UpdatePostTypeRequest) =>
    fetchBase.post<Post>(`${process.env.NEXT_PUBLIC_SERVER_API}/posts`, body),
};

export default demoTanstackQueryFetchRequest;
