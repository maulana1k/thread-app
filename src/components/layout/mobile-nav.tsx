"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home2,
  Magnifer,
  PenNewSquare,
  User,
  Inbox,
} from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";
import { CreatePostDialog } from "@/features/feeds/components/create-post-dialog";
import { useAuthStore } from "@/store/auth-store";
import { useCreatePostStore } from "@/features/feeds/store/create-post-store";
import { useEffect, useState } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const { profile } = useAuthStore();
  const { isSubmitting, submitStatus } = useCreatePostStore();
  const [profileUrl, setProfileUrl] = useState("/profile");

  useEffect(() => {
    if (profile?.username) {
      setProfileUrl(`/${profile.username}`);
    }
  }, [profile]);

  const items = [
    { title: "Home", url: "/", icon: Home2 },
    { title: "Search", url: "/search", icon: Magnifer },
    { title: "Post", url: "#", icon: PenNewSquare, isAction: true },
    { title: "Messages", url: "/messages", icon: Inbox },
    { title: "Profile", url: profileUrl, icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full pb-[env(safe-area-inset-bottom)] border-t-[0.5px] bg-background lg:hidden ">
      {isSubmitting && (
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary animate-pulse shadow-[0_0_15px_var(--color-primary)] z-50" />
      )}
      <div className="flex items-center justify-around px-2">
        {items.map((item) => {
          const isActive = pathname === item.url;

          if (item.isAction) {
            return (
              <CreatePostDialog
                key={item.title}
                trigger={
                  <button
                    className={cn(
                      "flex icon flex-col items-center justify-center gap-1 py-3 text-muted-foreground transition-colors hover:text-foreground",
                      isActive && "text-foreground",
                    )}
                  >
                    <item.icon
                      size={30}
                      weight={isActive ? "Bold" : "Linear"}
                    />
                  </button>
                }
              />
            );
          }

          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex icon flex-col items-center justify-center gap-1 py-3 text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-foreground",
              )}
            >
              <item.icon size={30} weight={isActive ? "Bold" : "Linear"} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
