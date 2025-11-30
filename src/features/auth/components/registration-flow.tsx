"use client";

import { useState, useEffect } from "react";
import { RegisterForm } from "./register-form";
import { OnboardingForm } from "./onboarding-form";
import { VerifyOtpForm } from "./verify-otp-form";
import { useUser } from "../hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

export function RegistrationFlow() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState<string>("");
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle initial state based on user status
  useEffect(() => {
    if (isLoading) return;

    if (user) {
      // User is logged in
      if (user.user_metadata?.onboarding_completed) {
        // Already completed onboarding, redirect to home
        router.push("/");
      } else {
        // Needs onboarding
        setStep(3);
      }
    } else {
      // User is not logged in
      // If we are on step 3 but not logged in, go back to 1
      if (step === 3) {
        setStep(1);
      }
    }
  }, [user, isLoading, router, step]);

  // Check for email in URL (e.g. from redirect)
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleRegisterSuccess = (registeredEmail: string) => {
    setEmail(registeredEmail);
    setStep(2);
  };

  const handleVerifySuccess = () => {
    setStep(3);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Bar Background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full -z-10" />
          
          {/* Active Progress Bar */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full -z-10 transition-all duration-500"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          />

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 bg-background p-2 rounded-full">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                step >= 1
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-background border-muted text-muted-foreground",
              )}
            >
              {step > 1 ? <Check size={20} /> : "1"}
            </div>
            <span className="text-xs font-medium text-muted-foreground absolute -bottom-6 left-0 w-20 text-center">Register</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-background p-2 rounded-full">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                step >= 2
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-background border-muted text-muted-foreground",
              )}
            >
              {step > 2 ? <Check size={20} /> : "2"}
            </div>
            <span className="text-xs font-medium text-muted-foreground absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 text-center">Verify</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 bg-background p-2 rounded-full">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                step >= 3
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-background border-muted text-muted-foreground",
              )}
            >
              {step === 3 ? "3" : <Check size={20} />}
            </div>
            <span className="text-xs font-medium text-muted-foreground absolute -bottom-6 right-0 w-20 text-center">Profile</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-12">
        {step === 1 && <RegisterForm onSuccess={handleRegisterSuccess} />}
        {step === 2 && <VerifyOtpForm email={email} onSuccess={handleVerifySuccess} />}
        {step === 3 && <OnboardingForm />}
      </div>
    </div>
  );
}
