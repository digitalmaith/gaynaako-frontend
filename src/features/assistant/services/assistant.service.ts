// src/features/assistant/services/assistant.service.ts
import { api } from "@/shared/services/api";
import type { SendMessagePayload, SendMessageResponse } from "../types";

export const assistantService = {
  // ⚠️ ENDPOINT À IMPLÉMENTER PAR L'ÉQUIPE IA — chemin/forme à confirmer
  sendMessage: async (payload: SendMessagePayload): Promise<SendMessageResponse> => {
    const { data } = await api.post<SendMessageResponse>("/assistant/chat", payload);
    return data;
  },
};