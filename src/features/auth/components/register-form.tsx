"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterCredentials } from "../types";
import { useRegister, useGoogleLogin } from "../hooks/use-auth";
import { AuthButton } from "./auth-button";
import { AuthInput } from "./auth-input";
import { SocialAuthButtons } from "./social-auth-buttons";
import { AuthDivider } from "./auth-divider";
import Link from "next/link";
import { toast } from "sonner";

export function RegisterForm() {
  const { mutate: register, isPending } = useRegister();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      username: "",
    },
  });

  function onSubmit(values: RegisterCredentials) {
    register(values, {
      onError: (error: any) => {
        toast.error(error.message || "Failed to create account");
      },
    });
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
      <div className="bg-card rounded-[20px] shadow-ios-medium p-6 sm:p-8">
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
            label="Full Name"
            type="text"
            error={errors.fullName?.message}
            {...registerField("fullName")}
          />

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
            <AuthButton type="submit" variant="primary" isLoading={isPending}>
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
              className="text-[var(--ios-blue)] font-semibold hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
