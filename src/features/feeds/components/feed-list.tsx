"use client";

import { useFeed } from "../hooks/use-feed";
import { FeedItem } from "./feed-item";
import { FeedItemSkeleton } from "./feed-item-skeleton";

export function FeedList() {
  const { data: posts, isLoading, error } = useFeed();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-12 px-3 py-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <FeedItemSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (error) return <div>Error loading feed</div>;

  return (
    <div className="flex flex-col md:gap-2">
      {posts?.map((post) => (
        <div
          key={post.id}
          className="px-3 py-4 sm:border-none border-b-[0.5px]"
        >
          <FeedItem post={post} />
        </div>
      ))}
    </div>
  );
}
