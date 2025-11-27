"use client";

import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { AltArrowRight } from "@solar-icons/react";
import { Message } from "../types";

interface MessageItemProps {
  message: Message;
  isLast: boolean;
}

export function MessageItem({ message }: MessageItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chat/${message.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 border-b border-border/40 cursor-pointer hover:bg-muted/50 transition-colors active:bg-muted",
      )}
    >
      {/* Avatar */}
      <div className="shrink-0">
        <UserAvatar
          className="h-14 w-14 border border-border/10"
          src={message.user.avatar}
          fallback={message.user.name}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[17px] tracking-tight truncate pr-2">
            {message.user.name}
          </span>
          <span
            className={cn(
              "text-[14px] shrink-0",
              message.unread > 0
                ? "text-blue-500 font-medium"
                : "text-muted-foreground/60",
            )}
          >
            {message.time}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p
            className={cn(
              "text-[15px] truncate leading-snug",
              message.unread > 0
                ? "text-foreground font-medium"
                : "text-muted-foreground",
            )}
          >
            {message.lastMessage}
          </p>
          {message.unread > 0 ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white ring-2 ring-background shrink-0">
              {message.unread}
            </span>
          ) : (
            <AltArrowRight
              size={18}
              className="text-muted-foreground/30 shrink-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}
