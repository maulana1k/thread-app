import { Skeleton } from "@/components/ui/skeleton";

export function MessageListSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Filter Pills Skeleton */}
      <div className="flex gap-2 px-4 pb-2 sticky top-[60px] z-10 bg-background/95 backdrop-blur-xl">
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      {/* Message Items Skeleton */}
      <div className="backdrop-blur-sm">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 border-b border-border/40"
          >
            <Skeleton className="h-14 w-14 rounded-full shrink-0" />
            <div className="flex flex-1 flex-col gap-2 min-w-0">
              <div className="flex justify-between items-baseline">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between items-center gap-2">
                <Skeleton className="h-4 w-full max-w-[200px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
