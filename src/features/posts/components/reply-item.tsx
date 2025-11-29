import { Post } from "../types";
import { UserAvatar } from "@/components/user-avatar";
import { formatTimeAgo } from "@/lib/utils";
import { Heart, ChatRound } from "@solar-icons/react";
import Link from "next/link";

interface ReplyItemProps {
  reply: Post;
}

export function ReplyItem({ reply }: ReplyItemProps) {
  return (
    <div className="p-4 border-b border-border/40 hover:bg-muted/50 transition-colors">
      <div className="flex gap-3">
        <UserAvatar
          size="md"
          className="shrink-0"
          src={reply.profiles?.avatar_url}
          fallback={reply.profiles?.full_name}
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">
              {reply.profiles?.full_name}
            </span>
            <span className="text-sm text-muted-foreground">
              @{reply.profiles?.username}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {formatTimeAgo(reply.created_at)}
            </span>
          </div>
          <Link href={`/post/${reply.id}`} className="block">
             <p className="text-sm leading-relaxed whitespace-pre-wrap">{reply.content}</p>
          </Link>
          <div className="flex items-center gap-4 pt-2">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
              <Heart size={16} />
              <span className="text-xs">{reply.likes_count}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <ChatRound size={16} />
              <span className="text-xs">{reply.replies_count}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
