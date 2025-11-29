export interface Post {
  id: string;
  user_id: string | null;
  topic_id: string | null;
  content: string;
  image_url: string | null;
  is_anonymous: boolean;
  created_at: string;
  parent_id: string | null;
  profiles?: {
    username: string;
    avatar_url: string;
    full_name: string;
  };
  likes_count: number;
  replies_count: number;
  user_has_liked?: boolean;
}
