"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterCredentials } from "../types";
import { useRegister, useGoogleLogin } from "../hooks/use-auth";
import { authService } from "../services/auth-service";
import { AuthButton } from "./auth-button";
import { AuthInput } from "./auth-input";
import { SocialAuthButtons } from "./social-auth-buttons";
import { AuthDivider } from "./auth-divider";
import Link from "next/link";
import { toast } from "sonner";

interface RegisterFormProps {
  onSuccess?: (email: string) => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { mutate: register, isPending } = useRegister();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: RegisterCredentials) {
    try {
      // Check username uniqueness
      const isAvailable = await authService.checkUsernameAvailability(
        values.username,
      );

      if (!isAvailable) {
        setError("username", {
          type: "manual",
          message: "Username is already taken",
        });
        return;
      }

      register(values, {
        onSuccess: () => {
          onSuccess?.(values.email);
        },
        onError: (error: any) => {
          console.log(error);
          toast.error(error.message || "Failed to create account");
        },
      });
    } catch (error) {
      toast.error("Failed to validate username");
    }
  }

  function handleGoogleSignIn() {
    googleLogin(undefined, {
      onError: (error: any) => {
        toast.error(error.message || "Failed to sign in with Google");
      },
    });
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 smooth-fade-in">
      <div className="rounded-[20px] shadow-ios-medium p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground text-[15px]">
            Sign up to get started
          </p>
        </div>

        {/* Social Auth */}
        <SocialAuthButtons
          onGoogleSignIn={handleGoogleSignIn}
          isLoading={isGoogleLoading}
        />

        <AuthDivider />

        {/* Email Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AuthInput
            label="Username"
            type="text"
            error={errors.username?.message}
            {...registerField("username")}
          />

          <AuthInput
            label="Email"
            type="email"
            error={errors.email?.message}
            {...registerField("email")}
          />

          <AuthInput
            label="Password"
            type="password"
            error={errors.password?.message}
            {...registerField("password")}
          />

          <div className="pt-2">
            <AuthButton
              type="submit"
              variant="primary"
              isLoading={isPending || isSubmitting}
            >
              Create Account
            </AuthButton>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[15px] text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-semibold hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
