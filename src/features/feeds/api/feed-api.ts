import { createClient } from "@/lib/supabase/client";
import { Post } from "../types";

export const feedApi = {
  getPosts: async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select(`
    *,
    profiles:profiles!posts_user_id_fkey (
      username,
      avatar_url,
      full_name
    ),
    likes:likes (
      count
    ),
    comments:comments (
      count
    )
  `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map((post: any) => ({
      ...post,
      likes_count: post.likes?.[0]?.count || 0,
      comments_count: post.comments?.[0]?.count || 0,
    })) as Post[];
  },

  getPost: async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        profiles (
          username,
          avatar_url,
          full_name
        ),
        likes (count),
        comments (count)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      ...data,
      likes_count: data.likes?.[0]?.count || 0,
      comments_count: data.comments?.[0]?.count || 0,
    } as Post;
  },

  getComments: async (postId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("comments")
      .select(`
        *,
        profiles (
          username,
          avatar_url,
          full_name
        ),
        likes (count)
      `)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return data.map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      user: {
        name: comment.profiles.full_name,
        username: comment.profiles.username,
        avatar: comment.profiles.avatar_url,
      },
      likes: comment.likes?.[0]?.count || 0,
    }));
  },
};
