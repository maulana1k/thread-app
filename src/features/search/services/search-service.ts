import { createClient } from "@/lib/supabase/client";
import { TrendingTopic, TrendingFeed, SuggestedUser } from "../types";

export const searchService = {
  getTrendingTopics: async (): Promise<TrendingTopic[]> => {
    const supabase = createClient();

    // Get topics
    const { data: topics, error } = await supabase
      .from("topics")
      .select("id, name, slug");

    if (error) throw error;
    if (!topics) return [];

    // For each topic, count posts (this is N+1 but fine for small number of topics)
    // A better way would be a view or a rpc function
    const topicsWithCounts = await Promise.all(
      topics.map(async (topic) => {
        const { count } = await supabase
          .from("posts")
          .select("*", { count: "exact", head: true })
          .eq("topic_id", topic.id);

        return {
          id: topic.id,
          name: topic.name,
          postsCount: count || 0,
        };
      }),
    );

    return topicsWithCounts
      .sort((a, b) => b.postsCount - a.postsCount)
      .slice(0, 6);
  },

  getTrendingFeeds: async (): Promise<TrendingFeed[]> => {
    const supabase = createClient();

    // Fetch posts with author and likes count
    // We'll just fetch recent posts for now as "trending"
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        image_url,
        created_at,
        profiles!inner (
          username,
          full_name
        ),
        likes (count)
      `)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    return posts.map((post: any) => ({
      id: post.id,
      content: post.content,
      imageUrl: post.image_url,
      author: {
        name: post.profiles.full_name,
        username: post.profiles.username,
      },
      likes: post.likes?.[0]?.count || 0,
    }));
  },

  getSuggestedUsers: async (): Promise<SuggestedUser[]> => {
    const supabase = createClient();

    // Fetch random profiles (or just first 5 for now)
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, username, full_name, avatar_url, bio")
      .limit(5);

    if (error) throw error;

    return profiles.map((profile: any) => ({
      id: profile.id,
      name: profile.full_name || profile.username,
      username: profile.username,
      avatar: profile.avatar_url,
      bio: profile.bio,
      isFollowing: false, // TODO: Implement follow check
    }));
  },

  search: async (
    query: string,
  ): Promise<{ posts: TrendingFeed[]; users: SuggestedUser[] }> => {
    const supabase = createClient();

    // Search posts
    const { data: posts } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        image_url,
        created_at,
        profiles!inner (
          username,
          full_name
        ),
        likes (count)
      `)
      .ilike("content", `%${query}%`)
      .limit(5);

    // Search users
    const { data: users } = await supabase
      .from("profiles")
      .select("id, username, full_name, avatar_url, bio")
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .limit(5);

    return {
      posts: (posts || []).map((post: any) => ({
        id: post.id,
        content: post.content,
        imageUrl: post.image_url,
        author: {
          name: post.profiles.full_name,
          username: post.profiles.username,
        },
        likes: post.likes?.[0]?.count || 0,
      })),
      users: (users || []).map((profile: any) => ({
        id: profile.id,
        name: profile.full_name || profile.username,
        username: profile.username,
        avatar: profile.avatar_url,
        bio: profile.bio,
        isFollowing: false,
      })),
    };
  },
};
