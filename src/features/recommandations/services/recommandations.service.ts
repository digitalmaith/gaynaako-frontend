// src/features/recommandations/services/recommandations.service.ts
import { api } from '@/shared/services/api';

export interface RecommandationOpportunite {
  id: string;
  titre: string;
  description: string | null;
  type: string | null;
  pays: string | null;
  secteurs: string[];
  organisation: string | null;
  url: string | null;
  deadline: string | null;
  qualityScore: number | null;
}

export interface Recommandation {
  id: string;
  scorePertinence: number;
  scorePourcentage: number;
  methodeMatching: string;
  dateGeneration: string;
  opportunite: RecommandationOpportunite;
}

export interface ListRecommandationsParams {
  page?: number;
  limit?: number;
  minScore?: number;
}

export interface ListRecommandationsResponse {
  items: Recommandation[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const recommandationsService = {
  async list(params: ListRecommandationsParams = {}): Promise<ListRecommandationsResponse> {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set('page', String(params.page));
    if (params.limit !== undefined) query.set('limit', String(params.limit));
    if (params.minScore !== undefined) query.set('minScore', String(params.minScore));

    const qs = query.toString();
    const response = await api.get<ListRecommandationsResponse>(
      `/recommandations${qs ? `?${qs}` : ''}`,
    );
    return response.data;   // ✅ Axios encapsule dans .data
  },
};