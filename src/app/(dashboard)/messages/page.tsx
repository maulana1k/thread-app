"use client";

import { Magnifer, Pen } from "@solar-icons/react";
import { MessageList } from "@/features/messages/components/message-list";

export default function MessagesPage() {
  return (
    <div className="min-h-screen max-w-xl mx-auto bg-background">
      {/* iOS Style Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl  pt-4 pb-2 px-4 transition-all">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold tracking-tight px-1">Messages</h1>
          <div className="flex gap-5 -mr-2">
            <button className="text-primary">
              <Magnifer size={22} />
            </button>
            <button className="text-primary">
              <Pen size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="pb-24">
        <MessageList />
      </div>
    </div>
  );
}
