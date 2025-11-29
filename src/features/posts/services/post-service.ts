import { createClient } from "@/lib/supabase/client";
import { Post } from "../types";

export const postService = {
  getPost: async (id: string): Promise<Post> => {
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
        likes(count),
        replies:posts!parent_post_id(count)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      ...data,
      likes_count: data.likes?.[0]?.count || 0,
      replies_count: data.replies?.[0]?.count || 0,
    };
  },

  getReplies: async (parentId: string): Promise<Post[]> => {
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
        likes(count),
        replies:posts!parent_post_id(count)
      `)
      .eq("parent_post_id", parentId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return data.map((post: any) => ({
      ...post,
      likes_count: post.likes?.[0]?.count || 0,
      replies_count: post.replies?.[0]?.count || 0,
    }));
  },

  createReply: async (parentId: string, content: string, userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .insert({
        content,
        user_id: userId,
        parent_post_id: parentId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

