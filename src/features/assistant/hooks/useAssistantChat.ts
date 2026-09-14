// src/features/assistant/hooks/useAssistantChat.ts
import { useState } from "react";
import { assistantService } from "../services/assistant.service";
import type { ChatContext, ChatMessage } from "../types";

export function useAssistantChat(context?: ChatContext) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (text: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setSending(true);
    setError(null);

    try {
      const response = await assistantService.sendMessage({
        message: text,
        conversationId,
        context,
      });
      setConversationId(response.conversationId);
      setMessages((prev) => [...prev, response.message]);
    } catch {
      setError("L'assistant est momentanément indisponible.");
    } finally {
      setSending(false);
    }
  };

  return { messages, sending, error, send };
}