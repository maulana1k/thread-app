import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: Date | string) {
  const now = new Date();
  const d = new Date(date);

  const diffInSeconds = Math.max(0, differenceInSeconds(now, d));
  if (diffInSeconds < 60) return `${diffInSeconds}s`;

  const diffInMinutes = differenceInMinutes(now, d);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const diffInHours = differenceInHours(now, d);
  if (diffInHours < 24) return `${diffInHours}h`;

  const diffInDays = differenceInDays(now, d);
  if (diffInDays < 7) return `${diffInDays}d`;

  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}
