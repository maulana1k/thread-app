export interface MessageUser {
  name: string;
  username: string;
  avatar: string;
  isGroup?: boolean;
}

export interface Message {
  id: number;
  user: MessageUser;
  lastMessage: string;
  time: string;
  unread: number;
}
