"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home2,
  Bell,
  User,
  PenNewSquare,
  Plain3,   
  Magnifer,
  UserCheck,
} from "@solar-icons/react/ssr";
import { useAuthStore } from "@/store/auth-store";
import { NotificationDrawer } from "@/components/notification-drawer";
import { useState } from "react";
import { CreatePostForm } from "@/features/feeds/components/create-post-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export function AppSidebar() {
  const pathname = usePathname();
  const { profile } = useAuthStore();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

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
      title: "Following",
      url: "/following",
      icon: UserCheck,
    },
    {
      title: "Notifications",
      url: null,
      icon: Bell,
      onClick: () => setNotificationOpen(true),
    },
    {
      title: "Messages",
      url: "/messages",
      icon: Plain3,
    },
    {
      title: "Create",
      url: null,
      icon: PenNewSquare,
      onClick: () => setOpen(true),
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
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = pathname === item.url;
            if (item.onClick) {
              return (
                <button
                  key={item.title}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center icon gap-3 rounded-2xl px-3 py-2 text-sm font-regular transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                    isActive ? "font-extrabold" : "font-medium",
                  )}
                >
                  <item.icon size={24} weight={isActive ? "Bold" : "Linear"} />
                  <span className="text-lg">{item.title}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex items-center icon gap-3 rounded-2xl px-3 py-2 text-sm font-regular transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "font-extrabold" : "font-medium",
                )}
              >
                <item.icon size={24} weight={isActive ? "Bold" : "Linear"} />
                <span className="text-lg">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl rounded-3xl p-0 gap-0 overflow-hidden bg-background/80 backdrop-blur-xl border shadow-2xl">
          <DialogHeader className="px-8 py-6 border-b ">
            <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>
          <CreatePostForm onSuccess={() => setOpen(false)} className="h-[500px]" />
        </DialogContent>
      </Dialog>
      <div className="px-6 py-4 text-muted-foreground/70 font-medium">
        <div className="flex text-sm items-center justify-between gap-4">
          About &middot; Help &middot; Privacy &middot; Terms &middot; Cookies &middot; Support
        </div>
        <span className="text-sm">© 2025 Jends</span>
      </div>

      <NotificationDrawer
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
      />
    </aside>
  );
}
