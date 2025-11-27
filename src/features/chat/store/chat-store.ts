import { create } from "zustand";
import { ChatMessage } from "../types";

interface ChatState {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  isTyping: false,
  setIsTyping: (isTyping) => set({ isTyping }),
}));
