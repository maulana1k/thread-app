import { create } from "zustand";

interface MessageState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
