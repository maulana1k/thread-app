import { Message } from "../types";

const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    user: {
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    lastMessage:
      "Hey! Are we still on for the meeting tomorrow? I have some updates regarding the project.",
    time: "9:41 AM",
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: "Jason Lee",
      username: "jasonlee",
      avatar: "https://i.pravatar.cc/150?u=jason",
    },
    lastMessage:
      "The design look great! I just sent over a few comments on Figma.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: "Design Team",
      username: "designteam",
      avatar: "https://i.pravatar.cc/150?u=team",
      isGroup: true,
    },
    lastMessage: "Alex: I uploaded the new assets to the drive.",
    time: "Friday",
    unread: 5,
  },
  {
    id: 4,
    user: {
      name: "Michael Chen",
      username: "mchen",
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
    lastMessage: "Thanks for the help!",
    time: "Thursday",
    unread: 0,
  },
  {
    id: 5,
    user: {
      name: "Emma Davis",
      username: "emmad",
      avatar: "https://i.pravatar.cc/150?u=emma",
    },
    lastMessage: "Can you send me the link?",
    time: "Wednesday",
    unread: 1,
  },
  {
    id: 6,
    user: {
      name: "David Brown",
      username: "davidb",
      avatar: "https://i.pravatar.cc/150?u=david",
    },
    lastMessage: "Sounds good to me.",
    time: "Mon",
    unread: 0,
  },
];

export const messageService = {
  getMessages: async (): Promise<Message[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_MESSAGES;
  },
};
