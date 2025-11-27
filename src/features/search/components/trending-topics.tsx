"use client";

import { useTrendingTopics } from "../hooks/use-search";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { AltArrowRight } from "@solar-icons/react";

export function TrendingTopics() {
  const { topics, isLoading } = useTrendingTopics();

  if (isLoading) {
    return (
      <div className="mx-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/40 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border-b border-border/40 last:border-b-0"
          >
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/40 overflow-hidden">
      {topics.map((topic, index) => (
        <button
          key={topic.id}
          className="w-full flex items-center justify-between p-4 border-b border-border/40 last:border-b-0 hover:bg-muted/30 active:bg-muted/50 transition-colors text-left"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[17px] tracking-tight">
              #{topic.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatNumber(topic.postsCount)} posts
            </p>
          </div>
          <AltArrowRight
            size={18}
            className="text-muted-foreground/40 shrink-0"
          />
        </button>
      ))}
    </div>
  );
}
