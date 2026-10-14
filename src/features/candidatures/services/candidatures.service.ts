// src/features/candidatures/services/candidatures.service.ts
import { api } from '@/shared/services/api';
import type { Candidature, PaginatedResponse } from '../types';

interface CreateCandidaturePayload {
  opportuniteId: string;
}



export const candidaturesService = {
  list: async (
    page: number,
    limit: number,
    statut?: string,
  ): Promise<PaginatedResponse<Candidature>> => {
    const { data } = await api.get<PaginatedResponse<Candidature>>('/candidatures', {
      params: { page, limit, ...(statut ? { statut } : {}) },
    });
    return data;
  },

  getById: async (candidatureId: string): Promise<Candidature> => {
    const { data } = await api.get<Candidature>(`/candidatures/${candidatureId}`);
    return data;
  },

  create: async (payload: CreateCandidaturePayload): Promise<Candidature> => {
    const { data } = await api.post<Candidature>('/candidatures', payload);
    return data;
  },

  updateStatut: async (id: string, statut: string): Promise<Candidature> => {
    const { data } = await api.patch<Candidature>(`/candidatures/${id}/statut`, { statut });
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/candidatures/${id}`);
  },
};