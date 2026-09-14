// src/features/assistant/types.ts
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ChatContext {
  candidatureId?: string;
  opportuniteId?: string;
}

export interface SendMessagePayload {
  message: string;
  conversationId?: string;
  context?: ChatContext; // ⚠️ à exploiter côté équipe IA pour enrichir le prompt système
}

export interface SendMessageResponse {
  conversationId: string;
  message: ChatMessage;
}