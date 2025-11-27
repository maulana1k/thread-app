import { Chat, ChatMessage } from "../types";

const MOCK_CHAT: Chat = {
  id: "1",
  user: {
    id: "1",
    name: "Sarah Wilson",
    username: "sarahw",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  isActive: true,
  messages: [
    {
      id: "1",
      content: "Hey! Are we still on for the meeting tomorrow?",
      sender: "them",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: "2",
      content: "Yes! I'll be there at 10 AM",
      sender: "me",
      timestamp: new Date(Date.now() - 7100000).toISOString(),
    },
    {
      id: "3",
      content: "Perfect! I have some updates regarding the project.",
      sender: "them",
      timestamp: new Date(Date.now() - 7000000).toISOString(),
    },
    {
      id: "4",
      content: "Great! Looking forward to it 🚀",
      sender: "me",
      timestamp: new Date(Date.now() - 6900000).toISOString(),
    },
    {
      id: "5",
      content: "Should I bring the design mockups?",
      sender: "them",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "6",
      content: "Yes please! That would be helpful",
      sender: "me",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: "7",
      content: "Alright, see you tomorrow! 👋",
      sender: "them",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
  ],
};

export const chatService = {
  getChat: async (chatId: string): Promise<Chat> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_CHAT;
  },

  sendMessage: async (
    chatId: string,
    content: string,
  ): Promise<ChatMessage> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      id: String(Date.now()),
      content,
      sender: "me",
      timestamp: new Date().toISOString(),
    };
  },
};
