"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { AuthButton } from "@/features/auth/components/auth-button";
import { useResendVerificationEmail } from "@/features/auth/hooks/use-auth";
import { toast } from "sonner";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { mutate: resendEmail, isPending } = useResendVerificationEmail();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email address not found");
      return;
    }

    resendEmail(email, {
      onSuccess: () => {
        toast.success("Verification email sent! Check your inbox.");
        setCountdown(60);
        setCanResend(false);
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to resend email");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto px-4 smooth-fade-in">
        <div className="rounded-[20px] shadow-ios-medium p-6 sm:p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-blue-500" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-background">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Verify Your Email</h1>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              We've sent a verification link to
            </p>
            {email && (
              <p className="text-foreground font-semibold text-[15px] mt-1">
                {email}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex gap-3">
              <div className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <p className="text-sm text-muted-foreground">
                Check your email inbox (and spam folder)
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <p className="text-sm text-muted-foreground">
                Click the verification link in the email
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p className="text-sm text-muted-foreground">
                Complete your profile setup
              </p>
            </div>
          </div>

          {/* Resend Email */}
          <div className="mb-6">
            <AuthButton
              variant="secondary"
              onClick={handleResendEmail}
              disabled={!canResend}
              isLoading={isPending}
            >
              {canResend
                ? "Resend Verification Email"
                : `Resend in ${countdown}s`}
            </AuthButton>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <span className="font-semibold">💡 Tip:</span> The verification
              link will expire in 24 hours. Make sure to verify your email soon!
            </p>
          </div>

          {/* Footer */}
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Already verified?{" "}
              <Link
                href="/login"
                className="text-blue-500 font-semibold hover:underline transition-all inline-flex items-center gap-1"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
            <p className="text-xs text-muted-foreground">
              Wrong email?{" "}
              <Link
                href="/register"
                className="text-foreground hover:underline"
              >
                Create a new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
