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
import { useRouter } from "next/navigation";
import { Bookmark, Camera, Notes, Refresh, Layers } from "@solar-icons/react";

export function ProfileContent({ username }: { username: string }) {
  const router = useRouter();
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
      <div className="flex flex-col lg:max-w-xl mx-auto items-center justify-center py-32 animate-in fade-in duration-500">
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
      <div className="grid grid-cols-3 gap-0.5 lg:max-w-xl mx-auto">
        {posts.map((post) => {
          let imageUrl = post.image_url;
          let isMultiple = false;
          try {
            if (imageUrl) {
              const parsed = JSON.parse(imageUrl);
              if (Array.isArray(parsed)) {
                imageUrl = parsed[0];
                isMultiple = parsed.length > 1;
              }
            }
          } catch (e) {
            // ignore
          }

          return (
            <div
              key={post.id}
              className="aspect-3/4 relative bg-muted cursor-pointer group overflow-hidden"
              onClick={() => router.push(`/post/${post.id}`)}
            >
              {imageUrl && (
                <>
                  <ImageLoader
                    src={imageUrl}
                    alt="Post"
                    className="w-full h-full object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                  />
                  {isMultiple && (
                    <div className="absolute top-2 right-2 text-white drop-shadow-md">
                      <Layers size={20} weight="Bold" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:max-w-xl mx-auto divide-y divide-border/40 pb-20">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border-b border-border/40">
          <FeedItem post={post} />
        </div>
      ))}
    </div>
  );
}
