import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;

export const onboardingSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
  avatar_url: z.string().optional(),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;

export interface ProfileUpdate {
  username?: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  onboarding_completed?: boolean;
}
