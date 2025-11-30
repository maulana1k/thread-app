"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, OnboardingData } from "../types";
import { useUpdateProfile, useUser } from "../hooks/use-auth";
import { AuthButton } from "./auth-button";
import { AuthInput } from "./auth-input";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AvatarUpload } from "./avatar-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function OnboardingForm() {
  const { data: user } = useUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      full_name: "",
      bio: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    if (user?.user_metadata?.username) {
      setValue("username", user.user_metadata.username);
    }
    if (user?.user_metadata?.full_name) {
      setValue("full_name", user.user_metadata.full_name);
    }
  }, [user, setValue]);

  function onSubmit(values: OnboardingData) {
    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    updateProfile(
      {
        userId: user.id,
        updates: {
          ...values,
          onboarding_completed: true,
        },
      },
      {
        onError: (error: any) => {
          toast.error(error.message || "Failed to update profile");
        },
        onSuccess: () => {
          toast.success("Profile completed!");
          router.push("/");
        },
      },
    );
  }

  function handleSkip() {
    if (!user?.id) return;

    updateProfile(
      {
        userId: user.id,
        updates: {
          onboarding_completed: true,
        },
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 smooth-fade-in">
      <div className="rounded-[20px]  p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <AvatarUpload
              username={user?.user_metadata.username}
              value={watch("avatar_url")}
              onChange={(url) =>
                setValue("avatar_url", url, { shouldValidate: true })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xs font-medium text-muted-foreground tracking-wider ml-1">
              Username
            </Label>
            <Input
              disabled
              id="username"
              {...register("username")}
              className="bg-muted/50 border-none h-12 px-4 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 transition-all"
              placeholder="Your Name"
            />
            {errors.username && (
              <p className="text-xs text-destructive ml-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-xs font-medium text-muted-foreground tracking-wider ml-1">
              Full Name
            </Label>
            <Input
              id="full_name"
              {...register("full_name")}
              className="bg-muted/50 border-none h-12 px-4 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 transition-all"
              placeholder="Your Name"
            />
            {errors.full_name && (
              <p className="text-xs text-destructive ml-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs font-medium text-muted-foreground tracking-wider ml-1">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  className="bg-muted/50 border-none min-h-[100px] p-4 rounded-xl resize-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all"
                  placeholder="Write a short bio..."
                  rows={7}
                />
                {errors.bio && (
                  <p className="text-xs text-destructive ml-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

          <div className="pt-2 space-y-3">
            <AuthButton type="submit" variant="primary" isLoading={isPending}>
              Complete Profile
            </AuthButton>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full text-[15px] text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
