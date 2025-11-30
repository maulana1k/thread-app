import { Spinner } from "@/components/ui/spinner";
import { RegistrationFlow } from "@/features/auth/components/registration-flow";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div><Spinner /></div>}>
        <RegistrationFlow />
      </Suspense>
    </div>
  );
}
