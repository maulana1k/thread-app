"use client";

import { use } from "react";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileTabs } from "@/features/profile/components/profile-tabs";
import { ProfileContent } from "@/features/profile/components/profile-content";
import { useRouter } from "next/navigation";
import { ProfilePageSkeleton } from "@/features/profile/components/profile-page-skeleton";
import { ProfileNotFound } from "@/features/profile/components/profile-not-found";
import { useAuthStore } from "@/store/auth-store";
import { ArrowLeft, CircleEllipsis } from "lucide-react";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string; }>;
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
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg px-4 h-[52px] flex lg:hidden items-center  transition-all">
        {!isCurrentUser &&
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft size={26} />
          </button>
        }
        {isCurrentUser && <span className="font-bold text-xl">{profile.username}</span>}
        <button className="p-2 -mr-2 ml-auto">
          <CircleEllipsis size={26} />
        </button>
      </div>

      <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
      <ProfileTabs />
      <ProfileContent username={username} />
    </div>
  );
}
