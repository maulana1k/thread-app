import { Skeleton } from "@/components/ui/skeleton";
import { ProfileSkeleton } from "./profile-skeleton";

export function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Sticky Header Skeleton */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40 px-4 h-[52px] flex items-center justify-between">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Profile Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:gap-8 pt-8 pb-4 px-4">
        {/* Avatar & User Info Section */}
        <div className="flex gap-3 items-center lg:items-start">
          <Skeleton className="h-24 w-24 lg:h-40 lg:w-40 rounded-full mb-4 border-2 border-background shadow-sm" />
          <div className="flex flex-col gap-2 mb-1 lg:mt-4">
            <Skeleton className="h-7 w-48 lg:w-64" /> {/* Name */}
            <Skeleton className="h-5 w-32 lg:w-40" /> {/* Username */}
          </div>
        </div>

        {/* Stats, Actions & Bio Section */}
        <div className="flex flex-col lg:items-start lg:flex-1 lg:mt-4">
          {/* Stats */}
          <div className="flex gap-6 mb-6">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full lg:max-w-xs mb-6">
            <Skeleton className="h-10 flex-1 rounded-lg" />
            <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>

          {/* Bio */}
          <div className="w-full max-w-md space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="sticky top-[52px] z-10 bg-background/95 backdrop-blur-xl border-b border-border/40 h-[49px] flex items-center">
        <div className="flex w-full">
          <div className="flex-1 flex justify-center">
            <Skeleton className="h-6 w-6" />
          </div>
          <div className="flex-1 flex justify-center">
            <Skeleton className="h-6 w-6" />
          </div>
          <div className="flex-1 flex justify-center">
            <Skeleton className="h-6 w-6" />
          </div>
          <div className="flex-1 flex justify-center">
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <ProfileSkeleton view="list" />
    </div>
  );
}
