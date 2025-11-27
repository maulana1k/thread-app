"use client";

import { useRouter } from "next/navigation";
import {
  AltArrowLeft,
  MenuDots,
  Videocamera,
  PhoneRounded,
} from "@solar-icons/react";
import { UserAvatar } from "@/components/user-avatar";
import { ChatUser } from "../types";

interface ChatHeaderProps {
  user: ChatUser;
  isActive?: boolean;
}

export function ChatHeader({ user, isActive }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/40 px-4 h-[60px] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 flex-1">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <AltArrowLeft size={24} />
        </button>
        <UserAvatar size="md" src={user.avatar} fallback={user.name} />
        <div className="flex flex-col">
          <span className="font-bold text-base leading-tight">{user.name}</span>
          <span className="text-xs text-muted-foreground">
            {isActive ? "Active now" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-primary">
          <PhoneRounded size={22} />
        </button>
        <button className="p-2 text-primary">
          <Videocamera size={22} />
        </button>
        <button className="p-2">
          <MenuDots size={22} />
        </button>
      </div>
    </div>
  );
}
