import { useState, useEffect } from "react";
import { Profile, ProfilePost } from "../types";
import { profileService } from "../services/profile-service";

export function useProfile(username: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile(username);
        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  return { profile, isLoading };
}

export function useProfilePosts(
  username: string,
  type: "posts" | "replies" | "media" | "saved",
) {
  const [posts, setPosts] = useState<ProfilePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await profileService.getPosts(username, type);
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [username, type]);

  return { posts, isLoading };
}
