"use client";

import { useTrendingFeeds } from "../hooks/use-search";
import { TrendingFeedCard } from "./trending-feed-card";
import { Skeleton } from "@/components/ui/skeleton";

export function TrendingFeeds() {
  const { feeds, isLoading } = useTrendingFeeds();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-border/40">
            <div className="flex gap-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {feeds.map((feed) => (
        <TrendingFeedCard key={feed.id} feed={feed} />
      ))}
    </div>
  );
}
