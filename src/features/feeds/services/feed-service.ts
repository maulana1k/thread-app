import { feedApi } from "../api/feed-api";

export const feedService = {
  getFeed: async () => {
    return await feedApi.getPosts();
  },
  getPost: async (id: string) => {
    return await feedApi.getPost(id);
  },
  getComments: async (postId: string) => {
    return await feedApi.getComments(postId);
  },
};
