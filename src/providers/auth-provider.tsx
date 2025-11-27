"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useUser, useProfile } from "@/features/auth/hooks/use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();
  const { data: profile } = useProfile(user?.id);
  const { setUser, setProfile, setLoading } = useAuthStore();

  useEffect(() => {
    setUser(user ?? null);
    setLoading(isLoading);
  }, [user, isLoading, setUser, setLoading]);

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  return <>{children}</>;
}
