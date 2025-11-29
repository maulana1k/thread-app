import { create } from "zustand";
import { Profile } from "../types";

interface ProfileState {
  activeTab: "posts" | "repost" | "media" | "saved";
  setActiveTab: (tab: "posts" | "repost" | "media" | "saved") => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  activeTab: "posts",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
