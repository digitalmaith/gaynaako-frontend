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
  context?: ChatContext;
}

export interface SendMessageResponse {
  conversationId: string;
  message: ChatMessage;
  // 👇 ajouts optionnels
  intent?: string;
  suggestions?: string[];
  meta?: {
    opportunities_used?: number;
    duration_ms?: number;
    model?: string;
  };
}

export interface Conversation {
  id: string;
  title: string;
  lastMessageAt: string;
  context?: ChatContext;
}

export interface ConversationDetail extends Conversation {
  messages: ChatMessage[];
}