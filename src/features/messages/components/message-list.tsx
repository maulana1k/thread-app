"use client";

import { useState } from "react";
import { useMessages } from "../hooks/use-messages";
import { MessageItem } from "./message-item";
import { cn } from "@/lib/utils";

type FilterType = "all" | "unread";

import { MessageListSkeleton } from "./message-list-skeleton";

export function MessageList() {
  const { messages, isLoading } = useMessages();
  const [filter, setFilter] = useState<FilterType>("all");

  if (isLoading) {
    return <MessageListSkeleton />;
  }

  const filteredMessages = messages.filter((msg) =>
    filter === "all" ? true : msg.unread > 0,
  );

  return (
    <div className="flex flex-col">
      {/* Filter Pills */}
      <div className="flex gap-2 px-4 pb-2 z-10 bg-background/95 backdrop-blur-xl">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-1.5 border rounded-full text-sm font-medium transition-colors",
            filter === "all"
              ? "bg-muted"
              : "text-muted-foreground hover:bg-muted/80",
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn(
            "px-4 py-1.5 border rounded-full text-sm font-medium transition-colors",
            filter === "unread"
              ? "bg-muted"
              : "text-muted-foreground hover:bg-muted/80",
          )}
        >
          Unread
        </button>
      </div>

      {/* Message List */}
      <div className="backdrop-blur-sm">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No {filter} messages
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <MessageItem
              key={message.id}
              message={message}
              isLast={index === filteredMessages.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
