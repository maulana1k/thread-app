"use client";

import { useState } from "react";
import { Gallery } from "@solar-icons/react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isSending?: boolean;
}

export function ChatInput({ onSend, isSending }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || isSending) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border/40 bg-background p-4 shrink-0">
      <div className="flex items-end gap-2">
        <button className="p-2 text-muted-foreground hover:text-primary shrink-0">
          <Gallery size={24} />
        </button>

        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message..."
            disabled={isSending}
            className="min-h-[44px] max-h-[120px] resize-none rounded-3xl pr-12 py-3"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className={cn(
              "absolute right-2 bottom-2 p-2 rounded-full transition-colors",
              message.trim() && !isSending
                ? "text-primary hover:bg-primary/10"
                : "text-muted-foreground/50",
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
