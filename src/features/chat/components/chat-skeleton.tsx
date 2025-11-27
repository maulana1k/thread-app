import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/40 px-4 h-[60px] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Received message */}
        <div className="flex gap-2 justify-start">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-16 w-[200px] rounded-2xl rounded-bl-sm" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Sent message */}
        <div className="flex gap-2 justify-end">
          <div className="space-y-2 flex flex-col items-end">
            <Skeleton className="h-12 w-[150px] rounded-2xl rounded-br-sm" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Received message */}
        <div className="flex gap-2 justify-start">
          <Skeleton className="h-8 w-8 rounded-full shrink-0 invisible" />
          <div className="space-y-2">
            <Skeleton className="h-20 w-[220px] rounded-2xl rounded-bl-sm" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Sent message */}
        <div className="flex gap-2 justify-end">
          <div className="space-y-2 flex flex-col items-end">
            <Skeleton className="h-14 w-[180px] rounded-2xl rounded-br-sm" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* Received message */}
        <div className="flex gap-2 justify-start">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-[160px] rounded-2xl rounded-bl-sm" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>

      {/* Input Skeleton */}
      <div className="border-t border-border/40 bg-background p-4 shrink-0">
        <div className="flex items-end gap-2">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <Skeleton className="h-12 flex-1 rounded-3xl" />
        </div>
      </div>
    </>
  );
}
