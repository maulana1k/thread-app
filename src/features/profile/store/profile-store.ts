import { create } from "zustand";
import { Profile } from "../types";

interface ProfileState {
  activeTab: "posts" | "replies" | "media" | "saved";
  setActiveTab: (tab: "posts" | "replies" | "media" | "saved") => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  activeTab: "posts",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
