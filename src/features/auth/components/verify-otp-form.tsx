"use client";

import { useState, useEffect } from "react";
import { useResendVerificationEmail, useVerifyEmailOtp } from "../hooks/use-auth";
import { toast } from "sonner";
import { AuthButton } from "./auth-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Mail } from "lucide-react";

interface VerifyOtpFormProps {
  email: string;
  onSuccess: () => void;
}

export function VerifyOtpForm({ email, onSuccess }: VerifyOtpFormProps) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyEmailOtp();
  const { mutate: resendEmail, isPending: isResending } = useResendVerificationEmail();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = () => {
    if (otp.length !== 8) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    verifyOtp(
      { email, token: otp },
      {
        onSuccess: () => {
          toast.success("Email verified successfully!");
          onSuccess();
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to verify OTP");
        },
      }
    );
  };

  const handleResendEmail = () => {
    resendEmail(email, {
      onSuccess: () => {
        toast.success("Verification code sent!");
        setCountdown(60);
        setCanResend(false);
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to resend code");
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 smooth-fade-in">
      <div className="rounded-[20px] shadow-ios-medium p-6 sm:p-8 bg-card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          <p className="text-muted-foreground text-[15px]">
            We sent a 8-digit code to <span className="font-semibold text-foreground">{email}</span>
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <InputOTP
            maxLength={8}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="space-y-4">
          <AuthButton
            variant="primary"
            onClick={handleVerify}
            isLoading={isVerifying}
            disabled={otp.length !== 8}
          >
            Verify Email
          </AuthButton>

          <button
            type="button"
            onClick={handleResendEmail}
            disabled={!canResend || isResending}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {canResend
              ? "Resend code"
              : `Resend code in ${countdown}s`}
          </button>
        </div>
      </div>
    </div>
  );
}
