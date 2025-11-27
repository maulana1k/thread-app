import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Profile } from "../types";
import { VerifiedCheck } from "@solar-icons/react";
import { formatNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function ProfileHeader({
  profile,
  isCurrentUser = false,
}: {
  profile: Profile;
  isCurrentUser?: boolean;
}) {
  const router = useRouter();
  console.log(profile);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 items-center pt-8 pb-4 px-4">
      <UserAvatar
        src={profile.avatar_url}
        fallback={profile?.full_name}
        size="2xl"
        className="mb-4 lg:size-40 border-2 border-background shadow-sm"
      />
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex items-center gap-1 mb-1">
          <h1 className="text-xl font-bold">{profile.full_name}</h1>
          {profile.isVerified && (
            <VerifiedCheck size={18} className="text-blue-500" weight="Bold" />
          )}
        </div>
        <p className="text-sm mb-4 lg:text-xl lg:font-semibold">
          @{profile.username}
        </p>

        <div className="flex gap-6 mb-6 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">
              {formatNumber(profile.stats.following)}
            </span>
            <span className="text-muted-foreground text-xs">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">
              {formatNumber(profile.stats.followers)}
            </span>
            <span className="text-muted-foreground text-xs">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">
              {formatNumber(profile.stats.likes)}
            </span>
            <span className="text-muted-foreground text-xs">Likes</span>
          </div>
        </div>

        <div className="flex gap-2 w-full max-w-xs">
          {isCurrentUser ? (
            <Button
              className="flex-1 rounded-lg font-semibold"
              variant="secondary"
              onClick={() => router.push("/onboarding")}
            >
              Edit Profile
            </Button>
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

        <p className="mt-6 text-center lg:text-left text-sm whitespace-pre-wrap leading-relaxed max-w-md">
          {profile.bio}
        </p>
      </div>
    </div>
  );
}
