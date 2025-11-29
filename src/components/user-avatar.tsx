"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps
  extends React.ComponentPropsWithoutRef<typeof Avatar> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizeClasses = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
  "2xl": "h-24 w-24",
};

export function UserAvatar({
  src,
  alt,
  fallback,
  className,
  size = "md",
  ...props
}: UserAvatarProps) {
  return (
    <Avatar className={cn(sizeClasses[size], className)} {...props}>
      {src && <AvatarImage src={src} alt={alt || "User avatar"} className="object-cover" />}
      <AvatarImage src="/blank-profile-picture.jpg" alt="Default avatar" />
      <AvatarFallback>{fallback?.[0]?.toUpperCase() || "?"}</AvatarFallback>
    </Avatar>
  );
}
