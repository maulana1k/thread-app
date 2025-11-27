"use client";

import { useRouter } from "next/navigation";
import { AltArrowLeft, MenuDots } from "@solar-icons/react";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/40 px-4 h-[52px] flex items-center justify-between">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <AltArrowLeft size={24} />
        </button>
        <span className="font-bold text-lg">Post</span>
        <button className="p-2 -mr-2">
          <MenuDots size={24} />
        </button>
      </div>

      {children}
    </div>
  );
}
