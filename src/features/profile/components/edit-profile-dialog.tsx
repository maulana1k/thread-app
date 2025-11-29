"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Profile } from "../types";
import { profileService } from "../services/profile-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { createClient } from "@/lib/supabase/client";
import { Camera } from "lucide-react";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string()
    .max(160, "Bio must be less than 160 characters")
    .refine((val) => (val.match(/\n/g) || []).length < 7, "Bio cannot exceed 7 lines")
    .optional(),
  avatar_url: z.url("Invalid URL").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  profile: Profile;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onProfileUpdate?: (profile: Profile) => void;
}

export function EditProfileDialog({
  profile,
  trigger,
  open,
  onOpenChange,
  onProfileUpdate,
}: EditProfileDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      username: profile.username || "",
      bio: profile.bio || "",
      avatar_url: profile.avatar_url || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const updatedProfile = await profileService.updateProfile(profile.id, data);
      toast.success("Profile updated successfully");
      onProfileUpdate?.(updatedProfile);
      setIsOpen?.(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.username}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("user_avatars")
        .upload(fileName, file, {
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("user_avatars")
        .getPublicUrl(fileName);

      form.setValue("avatar_url", publicUrl);
      toast.success("Avatar uploaded successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-0 gap-0 overflow-hidden bg-background/80 backdrop-blur-xl border-none shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-border/10 bg-transparent">
          <DialogTitle className="text-center text-lg font-semibold">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group cursor-pointer" onClick={() => document.getElementById("avatar-upload")?.click()}>
                <UserAvatar
                  src={form.watch("avatar_url") || profile.avatar_url}
                  fallback={profile.full_name}
                  size="xl"
                  className="w-24 h-24 border-4 border-background shadow-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white drop-shadow-md" />
                </div>
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                className="text-primary font-semibold h-auto p-0 hover:bg-transparent hover:text-primary/80"
                onClick={() => document.getElementById("avatar-upload")?.click()}
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Change Photo"}
              </Button>
            </div>

            {/* Form Fields - Apple Style List */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-xs font-medium text-muted-foreground tracking-wider ml-1">
                  Display Name
                </Label>
                <Input
                  id="full_name"
                  {...form.register("full_name")}
                  className="bg-muted/50 border-none h-12 px-4 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 transition-all"
                  placeholder="Your Name"
                />
                {form.formState.errors.full_name && (
                  <p className="text-xs text-destructive ml-1">
                    {form.formState.errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-medium text-muted-foreground tracking-wider ml-1">
                  Username
                </Label>
                <Input
                  id="username"
                  {...form.register("username")}
                  disabled
                  className="bg-muted/50 border-none h-12 px-4 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 transition-all opacity-60 cursor-not-allowed"
                  placeholder="username"
                />
                {form.formState.errors.username && (
                  <p className="text-xs text-destructive ml-1">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs font-medium text-muted-foreground tracking-wider ml-1">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  {...form.register("bio")}
                  className="bg-muted/50 border-none min-h-[100px] p-4 rounded-xl resize-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all"
                  placeholder="Write a short bio..."
                  rows={7}
                />
                {form.formState.errors.bio && (
                  <p className="text-xs text-destructive ml-1">
                    {form.formState.errors.bio.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 pt-2 flex gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 rounded-xl font-semibold border-border/50 hover:bg-muted/50"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Done"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
