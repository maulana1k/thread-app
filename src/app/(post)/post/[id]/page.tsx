"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AltArrowLeft } from "@solar-icons/react";
import { Button } from "@/components/ui/button";
import { usePost, useReplies } from "@/features/posts/hooks/use-post";
import { PostDetail } from "@/features/posts/components/post-detail";
import { ReplyList } from "@/features/posts/components/reply-list";
import { ReplyInput } from "@/features/posts/components/reply-input";
import { MenuDots } from "@solar-icons/react/ssr";

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data: post, isLoading: isPostLoading, error: postError } = usePost(id);
  const { data: replies, isLoading: isRepliesLoading } = useReplies(id);

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
    <div className="max-w-xl mx-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg px-4 h-[52px] flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-muted/50 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-lg">Post</span>
        <button className="p-2 -mr-2">
          <MenuDots size={24} />
        </button>
      </div>

      <PostDetail post={post} />
      
      <ReplyInput parentId={post.id} />

      {isRepliesLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ReplyList replies={replies || []} />
      )}
    </div>
  );
}
