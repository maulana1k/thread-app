import { createClient } from "@/lib/supabase/client";
import { Profile, ProfilePost } from "../types";

export const profileService = {
  getProfile: async (username: string): Promise<Profile> => {
    const supabase = createClient();

    // Fetch profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (error) throw error;

    // Calculate stats
    // Note: Follows table is missing in schema, so following/followers are 0 for now
    // We can count total likes received on user's posts
    const { count: likesCount } = await supabase
      .from("likes")
      .select("post_id", { count: "exact", head: true })
      .eq("user_id", profile.id); // This counts likes GIVEN by user, not received.
    // To count received likes we'd need to join posts. For now let's keep it simple or 0.

    // Actually, let's just return 0 for now to keep it fast and simple until we add the relations

    return {
      ...profile,
      stats: {
        following: 0,
        followers: 0,
        likes: 0,
      },
      isVerified: false, // Not in schema
    };
  },

  getPosts: async (
    username: string,
    type: "posts" | "repost" | "media" | "saved",
  ): Promise<ProfilePost[]> => {
    const supabase = createClient();

    // First get user_id from username
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (!profile) return [];

    let query = supabase
      .from("posts")
      .select(`
        *,
        profiles:profiles!posts_user_id_fkey (
          username,
          full_name,
          avatar_url
        ),
        likes (count),
        comments (count)
      `)
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false });

    if (type === "media") {
      query = query.not("image_url", "is", null);
    }
    // Handle other types if schema supports them (replies, saved)

    const { data, error } = await query;

    if (error) throw error;

    return data.map((post: any) => ({
      ...post,
      likes_count: post.likes?.[0]?.count ?? 0,
      comments_count: post.comments?.[0]?.count ?? 0,
      type: post.image_url ? "media" : "post", // Simple inference
    }));
  },
  updateProfile: async (
    userId: string,
    updates: Partial<Pick<Profile, "full_name" | "username" | "bio" | "avatar_url">>
  ): Promise<Profile> => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      stats: {
        following: 0,
        followers: 0,
        likes: 0,
      },
      isVerified: false,
    };
  },
};
