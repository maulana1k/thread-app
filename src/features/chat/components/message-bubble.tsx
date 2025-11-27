import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { ChatMessage, ChatUser } from "../types";

interface MessageBubbleProps {
  message: ChatMessage;
  user: ChatUser;
  showAvatar: boolean;
}

export function MessageBubble({
  message,
  user,
  showAvatar,
}: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2",
        message.sender === "me" ? "justify-end" : "justify-start",
      )}
    >
      {message.sender === "them" && (
        <UserAvatar
          className={cn("shrink-0", !showAvatar && "invisible")}
          size="sm"
          src={user.avatar}
          fallback={user.name}
        />
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2",
          message.sender === "me"
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted rounded-bl-sm",
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <span
          className={cn(
            "text-[10px] mt-1 block",
            message.sender === "me"
              ? "text-primary-foreground/70"
              : "text-muted-foreground",
          )}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
