import { useState, useEffect } from "react";
import { Chat } from "../types";
import { chatService } from "../services/chat-service";
import { useChatStore } from "../store/chat-store";

export function useChat(chatId: string) {
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setMessages } = useChatStore();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const data = await chatService.getChat(chatId);
        setChat(data);
        setMessages(data.messages);
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChat();
  }, [chatId, setMessages]);

  return { chat, isLoading };
}

export function useSendMessage(chatId: string) {
  const [isSending, setIsSending] = useState(false);
  const { addMessage } = useChatStore();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setIsSending(true);
    try {
      const message = await chatService.sendMessage(chatId, content);
      addMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return { sendMessage, isSending };
}
