import { OnboardingForm } from "@/features/auth/components/onboarding-form";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-b from-background to-muted/20">
      <OnboardingForm />
    </div>
  );
}
