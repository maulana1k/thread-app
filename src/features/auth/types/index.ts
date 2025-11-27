import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  username: z.string().min(3),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;

export const onboardingSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
  avatar_url: z.url().optional().or(z.literal("")),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;

export interface ProfileUpdate {
  username?: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  onboarding_completed?: boolean;
}
