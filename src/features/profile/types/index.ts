export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  stats: {
    following: number;
    followers: number;
    likes: number;
  };
  isVerified?: boolean;
}

import { Post } from "@/features/feeds/types";

export interface ProfilePost extends Post {
  type: "post" | "reply" | "media";
}
