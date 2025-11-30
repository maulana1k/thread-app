"use client";

import { Magnifer, Pen } from "@solar-icons/react";
import { MessageList } from "@/features/messages/components/message-list";

export default function MessagesPage() {
  return (
    <div className="flex max-w-5xl ml-64">

      <div className="min-h-screen w-fit bg-background border-l border-border/50">
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl lg:max-w-md  pt-4 pb-2 px-4 transition-all">
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

        <div className="pb-24 h-full  ">
          <MessageList />
        </div>
      </div>
      <div className="h-screen w-full border-l border-border/50" >
        {/* empty chat content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 items-center justify-center text-center p-8">
            <h2 className="text-2xl font-bold mb-2">Select a chat</h2>
            <p className="text-muted-foreground">
              Start a conversation or select an existing chat to begin.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
