"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedList } from "@/features/feeds/components/feed-list";
import { Ghost, Bell } from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { InstallPWA } from "@/components/install-pwa";
import { ChevronDown } from "lucide-react";
import GlitchText from "@/components/GlitchText";
import Link from "next/link";
import { NotificationDrawer } from "@/components/notification-drawer";

interface TopicPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TopicPill({ label, isActive, onClick }: TopicPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
        isActive
          ? "bg-foreground text-background"
          : "border text-muted-foreground hover:bg-muted/70",
      )}
    >
      {label}
    </button>
  );
}

const TOPICS = ["musik", "olahraga", "teknologi", "seni", "kuliner"];

export default function DashboardPage() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className="container mx-auto max-w-xl ">
      <div className="hidden lg:flex justify-center items-center gap-1 py-6 px-3 ">
        <div className="text-lg font-bold">For You</div>
        <ChevronDown size={18} className="opacity-50" />
        {/* <div className="text-xl font-semibold opacity-30">Following</div>
        <div className="text-xl font-semibold opacity-30">Saved</div> */}
      </div>
      <div className="flex justify-between items-center lg:hidden gap-3 p-4 ">
        <div className="flex items-center w-full gap-2 text-2xl font-bold">
          <Link href="/" className="flex items-center gap-2 font-bold">
            Jends
          </Link>
        </div>
        <InstallPWA />
        <ThemeToggle />
        <button onClick={() => setNotificationOpen(true)}>
          <Bell size={28} weight="Linear" />
        </button>
      </div>
      <FeedList />
      <NotificationDrawer
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
      />
    </div>
  );
}
