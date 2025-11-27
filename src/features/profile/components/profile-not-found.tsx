import { Button } from "@/components/ui/button";
import { Ghost, Home2 } from "@solar-icons/react";
import Link from "next/link";

export function ProfileNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <Ghost
          size={80}
          className="relative text-muted-foreground"
          weight="BoldDuotone"
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="text-muted-foreground max-w-xs mx-auto">
          The user you are looking for doesn't exist or has been moved.
        </p>
      </div>
      <Button asChild className="rounded-full px-8" size="lg">
        <Link href="/">
          <Home2 className="mr-2" size={20} />
          Go Home
        </Link>
      </Button>
    </div>
  );
}
