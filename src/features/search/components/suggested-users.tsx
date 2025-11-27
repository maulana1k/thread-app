"use client";

import { useSuggestedUsers } from "../hooks/use-search";
import { SuggestedUserCard } from "./suggested-user-card";
import { Skeleton } from "@/components/ui/skeleton";

export function SuggestedUsers() {
  const { users, isLoading } = useSuggestedUsers();

  if (isLoading) {
    return (
      <div className="space-y-4 px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 px-4">
      {users.map((user) => (
        <SuggestedUserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
