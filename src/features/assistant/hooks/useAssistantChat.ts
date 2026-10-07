// src/features/assistant/hooks/useAssistantChat.ts
import { useEffect, useState } from "react";
import { assistantService } from "../services/assistant.service";
import type { ChatContext, ChatMessage } from "../types";

interface UseAssistantChatOptions {
  context?: ChatContext;
  conversationId?: string;
}

export function useAssistantChat({
  context,
  conversationId: initialId,
}: UseAssistantChatOptions = {}) {
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
        // 👇 Messages historiques : pas de `isNew` → affichage instantané
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
    // Message utilisateur : instantané (pas de typewriter pour l'utilisateur)
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

      // 👇 Message assistant fraîchement reçu : `isNew: true` → effet typewriter
      setMessages((prev) => [
        ...prev,
        { ...response.message, isNew: true },
      ]);
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

  return {
    messages,
    sending,
    loadingHistory,
    error,
    conversationId,
    send,
    reset,
  };
}