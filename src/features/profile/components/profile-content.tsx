"use client";

import { useProfileStore } from "../store/profile-store";
import { useProfilePosts } from "../hooks/use-profile";
import { ImageLoader } from "@/components/ui/image-loader";
import { FeedItem } from "@/features/feeds/components/feed-item";
import { ProfileSkeleton } from "./profile-skeleton";

export function ProfileContent({ username }: { username: string }) {
  const { activeTab } = useProfileStore();
  const { posts, isLoading } = useProfilePosts(username, activeTab);

  if (isLoading) {
    return <ProfileSkeleton view={activeTab === "media" ? "grid" : "list"} />;
  }

  if (activeTab === "media") {
    return (
      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post) => (
          <div key={post.id} className="aspect-3/4 relative bg-muted">
            {post.image_url && (
              <ImageLoader
                src={post.image_url}
                alt="Post"
                className="w-full h-full object-cover rounded-none"
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border/40 pb-20">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border-b border-border/40">
          <FeedItem post={post} />
        </div>
      ))}
    </div>
  );
}
