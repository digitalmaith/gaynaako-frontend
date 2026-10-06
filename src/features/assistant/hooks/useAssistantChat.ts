// src/features/assistant/hooks/useAssistantChat.ts
import { useEffect, useState } from "react";
import { assistantService } from "../services/assistant.service";
import type { ChatContext, ChatMessage } from "../types";

interface UseAssistantChatOptions {
  context?: ChatContext;
  conversationId?: string; // charge l'historique si fourni
}

export function useAssistantChat({ context, conversationId: initialId }: UseAssistantChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>(initialId);
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(!!initialId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialId) return;
    queueMicrotask(async () => {
      setLoadingHistory(true);
      try {
        const detail = await assistantService.getConversation(initialId);
        setMessages(detail.messages);
        setConversationId(detail.id);
      } catch {
        setError("Impossible de charger cette conversation.");
      } finally {
        setLoadingHistory(false);
      }
    });
  }, [initialId]);

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

  const reset = () => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  };

  return { messages, sending, loadingHistory, error, conversationId, send, reset };
}