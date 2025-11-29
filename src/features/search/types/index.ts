export interface TrendingTopic {
  id: string;
  name: string;
  postsCount: number;
}

export interface TrendingFeed {
  id: string;
  content: string;
  image_url: string;
  author: {
    name: string;
    username: string;
  };
  likes: number;
}

export interface SuggestedUser {
  id: string;
  full_name: string;
  username: string;
  avatar: string;
  bio?: string;
  isFollowing: boolean;
}
