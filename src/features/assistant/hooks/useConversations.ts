// src/features/assistant/hooks/useConversations.ts
import { useCallback, useEffect, useState } from "react";
import { assistantService } from "../services/assistant.service";
import type { Conversation } from "../types";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await assistantService.listConversations();
      setConversations(data);
    } catch {
      setError("Impossible de charger vos conversations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchConversations();
    });
  }, [fetchConversations]);

  const removeConversation = async (conversationId: string) => {
    await assistantService.deleteConversation(conversationId);
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
  };

  const addConversationPlaceholder = (conversation: Conversation) => {
    setConversations((prev) => [conversation, ...prev]);
  };

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
    removeConversation,
    addConversationPlaceholder,
  };
}