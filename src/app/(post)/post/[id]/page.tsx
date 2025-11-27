"use client";

import { use } from "react";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageLoader } from "@/components/ui/image-loader";
import { formatTimeAgo } from "@/lib/utils";
import {
  Heart,
  ChatRound,
  Repeat,
  Plain,
  Bookmark,
  AltArrowLeft,
} from "@solar-icons/react";
import { useQuery } from "@tanstack/react-query";
import { feedService } from "@/features/feeds/services/feed-service";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => feedService.getPost(id),
  });

  const { data: comments, isLoading: isCommentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => feedService.getComments(id),
    enabled: !!post,
  });

  if (isPostLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-muted-foreground">Post not found</p>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg px-4 h-[52px] flex items-center gap-4 border-b border-border/40">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-muted/50 rounded-full transition-colors"
        >
          <AltArrowLeft size={24} />
        </button>
        <span className="font-bold text-lg">Post</span>
      </div>

      {/* Main Post */}
      <div className="p-4 border-b border-border/40">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <UserAvatar
            size="lg"
            src={post.profiles?.avatar_url}
            fallback={post.profiles?.full_name}
          />
          <div className="flex flex-col">
            <span className="font-bold">{post.profiles?.full_name}</span>
            <span className="text-sm text-muted-foreground">
              @{post.profiles?.username}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {post.image_url && (
            <div className="rounded-2xl overflow-hidden border border-border/40">
              <ImageLoader
                src={post.image_url}
                alt="Post image"
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Timestamp */}
          <div className="text-sm text-muted-foreground pt-2">
            {new Date(post.created_at).toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          {/* Stats */}
          <div className="flex gap-6 py-4 border-y border-border/40">
            <div className="flex gap-1">
              <span className="font-bold">
                {post.likes_count.toLocaleString()}
              </span>
              <span className="text-muted-foreground">Likes</span>
            </div>
            <div className="flex gap-1">
              <span className="font-bold">{post.comments_count}</span>
              <span className="text-muted-foreground">Comments</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-around py-2">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
              <Heart size={24} />
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ChatRound size={24} />
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Repeat size={24} />
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Bookmark size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="p-4 border-b border-border/40">
        <div className="flex gap-3">
          <UserAvatar size="md" className="shrink-0" fallback="U" />
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Write a comment..."
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-end">
              <Button size="sm" className="rounded-full px-6">
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-border/40">
        {isCommentsLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          comments?.map((comment: any) => (
            <div key={comment.id} className="p-4">
              <div className="flex gap-3">
                <UserAvatar
                  size="md"
                  className="shrink-0"
                  src={comment.user.avatar}
                  fallback={comment.user.name}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      {comment.user.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      @{comment.user.username}
                    </span>
                    <span className="text-sm text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">
                      {formatTimeAgo(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.content}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
                      <Heart size={16} />
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <ChatRound size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
