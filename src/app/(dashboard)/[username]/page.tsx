"use client";

import { use } from "react";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileTabs } from "@/features/profile/components/profile-tabs";
import { ProfileContent } from "@/features/profile/components/profile-content";
import { AltArrowLeft, MenuDots } from "@solar-icons/react";
import { useRouter } from "next/navigation";
import { ProfilePageSkeleton } from "@/features/profile/components/profile-page-skeleton";
import { ProfileNotFound } from "@/features/profile/components/profile-not-found";
import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const { profile, isLoading } = useProfile(username);
  const { profile: currentUserProfile } = useAuthStore();
  const router = useRouter();

  // Check if viewing current user's profile
  const isCurrentUser = currentUserProfile?.username === username;

  if (isLoading) return <ProfilePageSkeleton />;
  if (!profile) return <ProfileNotFound />;

  return (
    <div className="min-h-screen max-w-3xl mx-auto bg-background pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg px-4 h-[52px] flex lg:hidden items-center justify-between transition-all">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <AltArrowLeft size={24} />
        </button>
        <span className="font-bold text-lg">{profile.username}</span>
        <button className="p-2 -mr-2">
          <MenuDots size={24} />
        </button>
      </div>

      <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
      <ProfileTabs />
      <ProfileContent username={username} />
    </div>
  );
}
