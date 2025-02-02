import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import demoTanstackQueryFetchRequest from "./fetchRequest";
import { UpdatePostType } from "./type";

export const useGetPostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: demoTanstackQueryFetchRequest.getPosts,
  });
};

export const useGetPostDetailQuery = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => demoTanstackQueryFetchRequest.getPostDetail(id),
    enabled,
  });
};

export const useAddPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdatePostType) =>
      demoTanstackQueryFetchRequest.addPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
