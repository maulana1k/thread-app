import { Skeleton } from "@/components/ui/skeleton";
import { FeedItemSkeleton } from "@/features/feeds/components/feed-item-skeleton";

export function ProfileSkeleton({ view }: { view: "grid" | "list" }) {
  if (view === "grid") {
    return (
      <div className="grid grid-cols-3 gap-0.5 lg:max-w-xl mx-auto">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="aspect-3/4 w-full rounded-none" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:max-w-xl mx-auto divide-y divide-border/40 pb-20">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 border-b border-border/40">
          <FeedItemSkeleton />
        </div>
      ))}
    </div>
  );
}
