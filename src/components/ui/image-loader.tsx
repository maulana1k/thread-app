"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ImageLoader({ className, ...props }: ImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("relative w-full", loading && "min-h-[300px]")}>
      {loading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-xl z-10" />
      )}
      <Image
        {...props}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn(
          "w-full h-auto rounded-xl object-cover transition-opacity duration-300",
          className,
          loading ? "opacity-0" : "opacity-100",
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
