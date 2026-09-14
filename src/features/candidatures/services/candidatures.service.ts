// src/features/candidatures/services/candidatures.service.ts
import { api } from "@/shared/services/api";
import type { Candidature, PaginatedResponse } from "../types";

export const candidaturesService = {
  list: async (page: number, limit: number): Promise<PaginatedResponse<Candidature>> => {
    const { data } = await api.get<PaginatedResponse<Candidature>>("/candidatures", {
      params: { page, limit },
    });
    return data;
  },

  getById: async (candidatureId: string): Promise<Candidature> => {
    const { data } = await api.get<Candidature>(`/candidatures/${candidatureId}`);
    return data;
  },
};