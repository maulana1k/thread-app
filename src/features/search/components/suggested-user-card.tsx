"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { SuggestedUser } from "../types";
import { Check, Plus } from "lucide-react";

interface SuggestedUserCardProps {
  user: SuggestedUser;
}

export function SuggestedUserCard({ user }: SuggestedUserCardProps) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  const handleAvatarClick = () => {
    router.push(`/${user.username}`);
  };

  return (
    <div className="flex items-center gap-3 py-2">
      <UserAvatar
        onClick={handleAvatarClick}
        className="cursor-pointer hover:opacity-80 transition-opacity shrink-0"
        size="xl"
        src={user.avatar}
        fallback={user.full_name}
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-bold truncate">{user.username}</h3>
        <p className="font-semibold text-sm text-muted-foreground truncate">
          {user.full_name}
        </p>
        <p className="text-sm text-muted-foreground truncate">
          823 Followers
        </p>
      </div>

      <Button
        onClick={handleFollow}
        size="sm"
        variant={isFollowing ? "ghost" : "default"}
        className="rounded-full font-semibold shrink-0 text-sm"
      >
        {isFollowing && <Check className="h-4 w-4" />}
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
}
