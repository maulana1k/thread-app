"use client";

import { useRef, useEffect } from "react";
import { MessageBubble } from "./message-bubble";
import { ChatMessage, ChatUser } from "../types";
import { useChatStore } from "../store/chat-store";

interface MessageListProps {
  user: ChatUser;
}

export function MessageList({ user }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => {
        const showAvatar =
          msg.sender === "them" &&
          (index === messages.length - 1 ||
            messages[index + 1]?.sender !== "them");

        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            user={user}
            showAvatar={showAvatar}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
