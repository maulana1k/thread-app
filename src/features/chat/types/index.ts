export interface ChatUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "me" | "them";
  timestamp: string;
}

export interface Chat {
  id: string;
  user: ChatUser;
  messages: ChatMessage[];
  isActive?: boolean;
}
