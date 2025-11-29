"use client";

import { useProfileStore } from "../store/profile-store";
import { useProfilePosts } from "../hooks/use-profile";
import { ImageLoader } from "@/components/ui/image-loader";
import { FeedItem } from "@/features/feeds/components/feed-item";
import { ProfileSkeleton } from "./profile-skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Bookmark, Camera, Notes, Refresh } from "@solar-icons/react";

export function ProfileContent({ username }: { username: string }) {
  const { activeTab } = useProfileStore();
  const { posts, isLoading } = useProfilePosts(username, activeTab);

  if (isLoading) {
    return <ProfileSkeleton view={activeTab === "media" ? "grid" : "list"} />;
  }

  if (posts.length === 0) {
    const emptyStateContent = {
      posts: {
        icon: Notes,
        title: "No Posts Yet",
        description: "When you post, it will show up here.",
      },
      repost: {
        icon: Refresh,
        title: "No Respost",
        description: "Respost content will appear here.",
      },
      media: {
        icon: Camera,
        title: "No Media",
        description: "Media content will appear here.",
      },
      saved: {
        icon: Bookmark,
        title: "No Saved",
        description: "Posts you bookmark will appear here.",
      },
    }[activeTab as "posts" | "media" | "repost" | "saved"] || {
      icon: Notes,
      title: "No Posts Yet",
      description: "When you post, it will show up here.",
    };

    const Icon = emptyStateContent.icon;

    return (
      <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
        <Empty className="border-none p-0">
          <EmptyHeader>
            <EmptyMedia className="bg-transparent mb-6">
              <div className="rounded-full bg-muted/30 p-6 ring-1 ring-border/50">
                <Icon size={48} strokeWidth={1} className="text-muted-foreground/80" />
              </div>
            </EmptyMedia>
            <EmptyTitle className="text-xl font-bold text-foreground tracking-tight">
              {emptyStateContent.title}
            </EmptyTitle>
            <EmptyDescription className="text-base text-muted-foreground/80 max-w-[280px] mx-auto mt-2 font-medium">
              {emptyStateContent.description}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
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
