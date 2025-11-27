"use client";

import { use } from "react";
import { useChat, useSendMessage } from "@/features/chat/hooks/use-chat";
import { ChatHeader } from "@/features/chat/components/chat-header";
import { MessageList } from "@/features/chat/components/message-list";
import { ChatInput } from "@/features/chat/components/chat-input";
import { ChatSkeleton } from "@/features/chat/components/chat-skeleton";

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { chat, isLoading } = useChat(id);
  const { sendMessage, isSending } = useSendMessage(id);

  if (isLoading) {
    return <ChatSkeleton />;
  }

  if (!chat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Chat not found</div>
      </div>
    );
  }

  return (
    <>
      <ChatHeader user={chat.user} isActive={chat.isActive} />
      <MessageList user={chat.user} />
      <ChatInput onSend={sendMessage} isSending={isSending} />
    </>
  );
}
