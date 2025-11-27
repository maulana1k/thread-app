"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginCredentials } from "../types";
import { useLogin, useGoogleLogin } from "../hooks/use-auth";
import { AuthButton } from "./auth-button";
import { AuthInput } from "./auth-input";
import { SocialAuthButtons } from "./social-auth-buttons";
import { AuthDivider } from "./auth-divider";
import Link from "next/link";
import { toast } from "sonner";

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginCredentials) {
    login(values, {
      onError: (error: any) => {
        toast.error(error.message || "Failed to login");
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
      <div className="bg-card rounded-[20px]  p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-[15px]">
            Sign in to continue to your account
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
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <AuthInput
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="pt-2">
            <AuthButton type="submit" variant="primary" isLoading={isPending}>
              Sign In
            </AuthButton>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[15px] text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--ios-blue)] font-semibold hover:underline transition-all"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
