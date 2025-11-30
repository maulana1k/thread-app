"use client";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Profile } from "../types";
import { VerifiedCheck } from "@solar-icons/react";
import { formatNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { EditProfileDialog } from "./edit-profile-dialog";
import { useState, useEffect, useRef } from "react";

export function ProfileHeader({
  profile: initialProfile,
  isCurrentUser = false,
}: {
  profile: Profile;
  isCurrentUser?: boolean;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [isExpanded, setIsExpanded] = useState(false);

  const bioRef = useRef<HTMLParagraphElement>(null);
  const [showExpandButton, setShowExpandButton] = useState(false);

  useEffect(() => {
    setProfile(initialProfile);
    setIsExpanded(false);
  }, [initialProfile]);

  useEffect(() => {
    if (bioRef.current && !isExpanded) {
      setShowExpandButton(bioRef.current.scrollHeight > bioRef.current.clientHeight);
    }
  }, [profile.bio, isExpanded]);

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsExpanded(false);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:max-w-xl mx-auto lg:gap-8 pt-4 lg:pt-12 pb-4 px-4">
      <div className="flex gap-3 items-center lg:items-start">
        <UserAvatar
          src={profile.avatar_url}
          fallback={profile?.full_name}
          size="2xl"
          className="mb-4 lg:size-40 border-2 border-background shadow-sm"
        />
        <div className="flex lg:hidden flex-col gap-1 mb-1">
          <h1 className="text-xl font-bold">{profile.full_name}</h1>
          {profile.isVerified && (
            <VerifiedCheck size={18} className="text-blue-500" weight="Bold" />
          )}
          <p className="mb-4 lg:text-xl lg:font-semibold">
            @{profile.username}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:items-start">
        <div className="hidden lg:flex flex-col gap-1 mb-3">
          <p className="text-base font-medium">
            {profile.username}
          </p>
          <h1 className="text-2xl font-bold">{profile.full_name}</h1>
          {profile.isVerified && (
            <VerifiedCheck size={18} className="text-blue-500" weight="Bold" />
          )}
        </div>
        <div className="flex gap-6 mb-3 text-sm">
          <div className="flex gap-1 items-center">
            <span className="font-bold">
              {formatNumber(profile.stats.following)}
            </span>
            <span className="text-muted-foreground">Following</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="font-bold">
              {formatNumber(profile.stats.followers)}
            </span>
            <span className="text-muted-foreground">Followers</span>
          </div>
        </div>
        <div className="mb-6 max-w-md">
          <p
            ref={bioRef}
            className={`text-sm whitespace-pre-wrap leading-relaxed ${!isExpanded ? "line-clamp-3" : ""
              }`}
          >
            {profile.bio}
          </p>
          {showExpandButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground mt-1"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        <div className="flex gap-2 w-full lg:max-w-xs">
          {isCurrentUser ? (
            <EditProfileDialog
              profile={profile}
              onProfileUpdate={handleProfileUpdate}
              trigger={
                <Button
                  className="flex-1 rounded-lg font-semibold"
                  variant="outline"
                >
                  Edit Profile
                </Button>
              }
            />
          ) : (
            <>
              <Button
                className="flex-1 rounded-lg font-semibold"
                variant="default"
              >
                Follow
              </Button>
              <Button
                className="flex-1 rounded-lg font-semibold"
                variant="secondary"
              >
                Message
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
