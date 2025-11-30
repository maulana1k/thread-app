import { MobileNav } from "@/components/layout/mobile-nav";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { InstallPWA } from "@/components/install-pwa";
import { UserNav } from "@/components/layout/user-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh w-full">
      <AppSidebar />
      <main className="flex-1 w-full relative pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto p-0 pb-20 lg:pb-0">{children}</div>
        <MobileNav />
      </main>
    </div>
  );
}
