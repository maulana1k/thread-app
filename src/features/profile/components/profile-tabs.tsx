"use client";

import { cn } from "@/lib/utils";
import { useProfileStore } from "../store/profile-store";
import {
  Bookmark,
  Camera,
  Notes,
  Refresh,
} from "@solar-icons/react";

export function ProfileTabs() {
  const { activeTab, setActiveTab } = useProfileStore();

  const tabs = [
    { id: "posts", icon: Notes, label: "Posts" },
    { id: "repost", icon: Refresh, label: "Repost" },
    { id: "media", icon: Camera, label: "Media" },
    { id: "saved", icon: Bookmark, label: "Saved" },
  ] as const;

  return (
    <div className="sticky top-[52px] lg:top-0 lg:max-w-2xl mx-auto z-10 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center  justify-center py-3 relative transition-colors",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80",
            )}
          >
            <tab.icon
              size={24}
              weight={activeTab === tab.id ? "Bold" : "Linear"}
            />
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 w-8 bg-foreground mx-auto rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
