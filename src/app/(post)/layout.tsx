"use client";

import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { InstallPWA } from "@/components/install-pwa";
import { UserNav } from "@/components/layout/user-nav";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh w-full">
      <AppSidebar />
      <main className="flex-1 w-full relative pb-[env(safe-area-inset-bottom)]">
        <div className="fixed px-2 py-1 bg-muted/50 rounded-full top-4 right-4 hidden md:flex gap-4 items-center">
          <InstallPWA />
          <ThemeToggle />
          <UserNav />
        </div>
        <div className="mx-auto p-0 pb-20 lg:pb-0">{children}</div>
      </main>
    </div>
  );
}
