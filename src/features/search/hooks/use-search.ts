import { useState, useEffect } from "react";
import { TrendingTopic, TrendingFeed, SuggestedUser } from "../types";
import { searchService } from "../services/search-service";

export function useTrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await searchService.getTrendingTopics();
        setTopics(data);
      } catch (error) {
        console.error("Failed to fetch trending topics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, []);

  return { topics, isLoading };
}

export function useTrendingFeeds() {
  const [feeds, setFeeds] = useState<TrendingFeed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const data = await searchService.getTrendingFeeds();
        setFeeds(data);
      } catch (error) {
        console.error("Failed to fetch trending feeds:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeeds();
  }, []);

  return { feeds, isLoading };
}

export function useSuggestedUsers() {
  const [users, setUsers] = useState<SuggestedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await searchService.getSuggestedUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch suggested users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, isLoading };
}
