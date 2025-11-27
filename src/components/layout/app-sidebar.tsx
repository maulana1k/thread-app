"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Ghost,
  Home2,
  Magnifer,
  Bell,
  ChatRoundDots,
  User,
  PenNewSquare,
  Inbox,
} from "@solar-icons/react/ssr";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";
import { InstallPWA } from "@/components/install-pwa";
import { CreatePostDialog } from "@/features/feeds/components/create-post-dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { NotificationDrawer } from "@/components/notification-drawer";
import { useState } from "react";

export function AppSidebar() {
  const pathname = usePathname();
  const { profile } = useAuthStore();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home2,
    },
    {
      title: "Search",
      url: "/search",
      icon: Magnifer,
    },
    {
      title: "Notifications",
      url: null, // Changed to null to indicate it's not a link
      icon: Bell,
      onClick: () => setNotificationOpen(true),
    },
    {
      title: "Messages",
      url: "/messages",
      icon: Inbox,
    },
    {
      title: "Profile",
      url: `/${profile?.username}` || "/",
      icon: User,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col  bg-background lg:flex">
      <div className="flex  items-center px-8 pt-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-3xl">
          Jends
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4">
        <nav className="flex flex-col">
          {items.map((item) => {
            const isActive = pathname === item.url;

            // Render as button for Notifications
            if (item.onClick) {
              return (
                <button
                  key={item.title}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center gap-4 rounded-full px-4 py-3 text-sm font-regular transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "font-bold" : "",
                  )}
                >
                  <item.icon size={24} weight={isActive ? "Bold" : "Linear"} />
                  <span className="text-lg">{item.title}</span>
                </button>
              );
            }

            // Render as link for other items
            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex items-center gap-4 rounded-full px-4 py-3 text-sm font-regular transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "font-bold" : "",
                )}
              >
                <item.icon size={24} weight={isActive ? "Bold" : "Linear"} />
                <span className="text-lg">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <CreatePostDialog
          trigger={
            <Button
              className="w-full rounded-full gap-2 font-bold text-md"
              size="lg"
            >
              <PenNewSquare size={20} weight="Bold" />
              Post
            </Button>
          }
        />
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center justify-between gap-4 px-2">
          <UserNav />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <InstallPWA />
          </div>
        </div>
      </div>

      <NotificationDrawer
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
      />
    </aside>
  );
}
