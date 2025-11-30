import { createClient } from "@/lib/supabase/client";
import { LoginCredentials, RegisterCredentials } from "../types";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) throw error;
    return data;
  },

  register: async (credentials: RegisterCredentials) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          username: credentials.username,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  logout: async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getUser: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  signInWithGoogle: async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback/`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) throw error;
    return data;
  },

  getProfile: async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw error;
    return data;
  },

  updateProfile: async (userId: string, updates: any) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: userId, ...updates })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  checkOnboardingStatus: async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", userId)
      .single();
    if (error) throw error;
    return data?.onboarding_completed ?? false;
  },

  resendVerificationEmail: async (email: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });
    if (error) throw error;
    return data;
  },

  checkUsernameAvailability: async (username: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .maybeSingle();
    
    if (error) throw error;
    // Returns true if username is available (not found)
    return data === null;
  },

  verifyEmailOtp: async (email: string, token: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "signup",
    });
    if (error) throw error;
    return data;
  },
};
