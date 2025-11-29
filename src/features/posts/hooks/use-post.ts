import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/post-service";

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postService.getPost(id),
    enabled: !!id,
  });
};

export const useReplies = (parentId: string) => {
  return useQuery({
    queryKey: ["replies", parentId],
    queryFn: () => postService.getReplies(parentId),
    enabled: !!parentId,
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      parentId,
      content,
      userId,
    }: {
      parentId: string;
      content: string;
      userId: string;
    }) => postService.createReply(parentId, content, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["replies", variables.parentId],
      });
      queryClient.invalidateQueries({ queryKey: ["post", variables.parentId] });
    },
  });
};

