export interface TrendingTopic {
  id: string;
  name: string;
  postsCount: number;
}

export interface TrendingFeed {
  id: string;
  content: string;
  imageUrl?: string;
  author: {
    name: string;
    username: string;
  };
  likes: number;
}

export interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  isFollowing: boolean;
}
