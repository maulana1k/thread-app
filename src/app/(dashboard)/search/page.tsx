"use client";

import { useState } from "react";
import {
  Magnifer,
  CloseCircle,
  AltArrowRight,
  ClockCircle,
  Fire,
  AltArrowLeft,
  History,
  CourseUp,
} from "@solar-icons/react";
import { TrendingTopics } from "@/features/search/components/trending-topics";
import { TrendingFeeds } from "@/features/search/components/trending-feeds";
import { SuggestedUsers } from "@/features/search/components/suggested-users";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SEARCH_HISTORY = [
  "React best practices",
  "Next.js 15 features",
  "Tailwind CSS tips",
  "TypeScript tutorial",
];

const POPULAR_SEARCHES = [
  "AI and Machine Learning",
  "Web Development",
  "Design Systems",
  "Startup Ideas",
  "Remote Work",
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleCancel = () => {
    setIsFocused(false);
    setSearchQuery("");
  };

  const handleSearchClick = (query: string) => {
    setSearchQuery(query);
    setIsFocused(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Search */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl pt-4 pb-3 px-4">
        <div className="flex items-center gap-3">
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className={cn(
              "text-primary font-medium whitespace-nowrap transition-all duration-300",
              isFocused ? "flex w-8" : "hidden w-0 overflow-hidden",
            )}
          >
            <ChevronLeft size={24} />
          </button>
          {/* Search Input */}
          <div
            className={cn(
              "relative transition-al duration",
              isFocused ? "flex-1" : "w-full",
            )}
          >
            <Magnifer
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search posts, people, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="w-full h-12 pl-12 pr-12 rounded-2xl bg-secondary/50 dark:bg-card/30 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <CloseCircle size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "transition-opacity duration-300",
          isFocused ? "hidden pointer-events-none" : "",
        )}
      >
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-bold">Trending Topics</h2>
              <button className="flex items-center gap-1 text-sm text-primary font-medium hover:opacity-80 transition-opacity">
                See More
                <AltArrowRight size={16} />
              </button>
            </div>
            <TrendingTopics />
          </div>

          {/* Suggested People */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-bold">Suggested People</h2>
              <button className="flex items-center gap-1 text-sm text-primary font-medium hover:opacity-80 transition-opacity">
                See More
                <AltArrowRight size={16} />
              </button>
            </div>
            <SuggestedUsers />
          </div>

          {/* Trending Posts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-bold">Trending Posts</h2>
              <button className="flex items-center gap-1 text-sm text-primary font-medium hover:opacity-80 transition-opacity">
                See More
                <AltArrowRight size={16} />
              </button>
            </div>
            <TrendingFeeds />
          </div>
        </div>
      </div>

      {/* Search Suggestions (shown when focused) */}
      <div
        className={cn(
          "transition-opacity duration-300",
          isFocused ? "opacity-100" : "opacity-0 pointer-events-none absolute",
        )}
      >
        <div className="space-y-6 px-4 pt-4">
          {/* Search History */}
          {SEARCH_HISTORY.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Recent
                </h3>
                <button className="text-sm text-primary font-medium">
                  Clear
                </button>
              </div>
              {SEARCH_HISTORY.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchClick(item)}
                  className="w-full flex items-center gap-3 px-2 py-3 hover:bg-muted/30 active:bg-muted/50 transition-colors text-left rounded-lg"
                >
                  <History
                    size={20}
                    className="text-muted-foreground shrink-0"
                  />
                  <span className="flex-1 text-[15px]">{item}</span>
                  <ChevronRight
                    size={20}
                    className="text-muted-foreground/40 shrink-0"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-2">
              Popular
            </h3>
            {POPULAR_SEARCHES.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSearchClick(item)}
                className="w-full flex items-center gap-3 px-2 py-3 hover:bg-muted/30 active:bg-muted/50 transition-colors text-left rounded-lg"
              >
                <CourseUp size={20} className="text-primary shrink-0" />
                <span className="flex-1 text-[15px]">{item}</span>
                <ChevronRight
                  size={20}
                  className="text-muted-foreground/40 shrink-0"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
