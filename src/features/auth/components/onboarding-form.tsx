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

export function OnboardingForm() {
  const { data: user } = useUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      bio: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    if (user?.user_metadata?.username) {
      setValue("username", user.user_metadata.username);
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
      <div className="bg-card rounded-[20px]  p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-(--ios-blue)/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-(--ios-blue)"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground text-[15px]">
            Tell us a bit about yourself
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AuthInput
            label="Username"
            type="text"
            error={errors.username?.message}
            {...register("username")}
          />

          <div className="relative">
            <textarea
              className="w-full bg-muted/50 border-0 rounded-[12px] px-4 pt-6 pb-2 text-[17px] focus:bg-muted/70 focus:ring-2 focus:ring-[var(--ios-blue)]/20 focus:outline-none transition-all duration-200 resize-none min-h-[100px]"
              placeholder="Bio"
              {...register("bio")}
            />
            <label className="absolute left-4 top-2 text-xs font-medium text-muted-foreground">
              Bio (Optional)
            </label>
            {errors.bio && (
              <p className="mt-1.5 text-sm text-destructive px-1">
                {errors.bio.message}
              </p>
            )}
          </div>

          <AuthInput
            label="Avatar URL (Optional)"
            type="url"
            error={errors.avatar_url?.message}
            {...register("avatar_url")}
          />

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
