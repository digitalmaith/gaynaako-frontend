// src/features/assistant/services/assistant.service.ts
import { api } from "@/shared/services/api";
import type {
  ChatMessage,
  Conversation,
  ConversationDetail,
  SendMessagePayload,
  SendMessageResponse,
} from "../types";

interface BackendChatResponse {
  success: boolean;
  session_id: string;
  message: string;
  intent?: string;
  suggestions?: string[];
  meta?: {
    opportunities_used?: number;
    duration_ms?: number;
    model?: string;
  };
}

interface BackendSession {
  id: string;
  title?: string;
  message_count?: number;
  created_at?: string;
  updated_at?: string;
}

interface BackendHistoryMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const assistantService = {
  sendMessage: async (payload: SendMessagePayload): Promise<SendMessageResponse> => {
    const { data } = await api.post<BackendChatResponse>("/chat", {
      message: payload.message,
      session_id: payload.conversationId,
    });

    return {
      conversationId: data.session_id,
      message: {
        id: `${data.session_id}-${Date.now()}`,
        role: "assistant",
        content: data.message,
        createdAt: new Date().toISOString(),
      },
    };
  },

  listConversations: async (): Promise<Conversation[]> => {
    const { data } = await api.get<{ sessions: BackendSession[] } | BackendSession[]>(
      "/chat/sessions/me"
    );

    const sessions = Array.isArray(data) ? data : data.sessions ?? [];

    return sessions.map((s) => ({
      id: s.id,
      title: s.title ?? "Nouvelle conversation",
      lastMessageAt: s.updated_at ?? s.created_at ?? new Date().toISOString(),
    }));
  },

  getConversation: async (conversationId: string): Promise<ConversationDetail> => {
    const { data } = await api.get<{
      session_id: string;
      messages: BackendHistoryMessage[];
    }>(`/chat/session/${conversationId}/history`);

    const messages: ChatMessage[] = (data.messages ?? []).map((m, i) => ({
      id: `${conversationId}-${i}`,
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
      createdAt: new Date().toISOString(),
    }));

    return {
      id: data.session_id,
      title: "Conversation",
      lastMessageAt: new Date().toISOString(),
      messages,
    };
  },

  // ✅ Implémenté
  deleteConversation: async (conversationId: string): Promise<void> => {
    await api.delete(`/chat/session/${conversationId}`);
  },
};