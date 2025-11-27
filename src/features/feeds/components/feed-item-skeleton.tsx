import { Skeleton } from "@/components/ui/skeleton";

export function FeedItemSkeleton() {
  return (
    <div className="shadow-none border-none p-0">
      <div className="flex flex-row gap-2">
        <Skeleton className="size-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="pt-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
