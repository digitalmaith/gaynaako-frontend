// src/features/opportunities/services/opportunities-ia.service.ts
import { api } from '@/shared/services/api';
import type {
  OpportunityIa,
  OpportunityIaListResponse,
  OpportunityIaStats,
  OpportunityIaCountry,
  OpportunityIaFilters,
} from '../types/opportunity-ia';

export const opportunitiesIaService = {
  /**
   * Liste paginée des opportunités collectées par l'IA
   */
  list: async (
    filters: OpportunityIaFilters = {},
  ): Promise<OpportunityIaListResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));
    if (filters.country) params.set('country', filters.country);
    if (filters.sector) params.set('sector', filters.sector);
    if (filters.search) params.set('search', filters.search);
    if (filters.sourceType) params.set('sourceType', filters.sourceType);
    if (filters.minQuality) params.set('minQuality', String(filters.minQuality));
    if (filters.opportunityType)
      params.set('opportunityType', filters.opportunityType);

    const query = params.toString();
    const url = query ? `/opportunites-ia?${query}` : '/opportunites-ia';

    const { data } = await api.get<OpportunityIaListResponse>(url);
    return data;
  },

  /**
   * Détail d'une opportunité IA par son ID
   */
  getById: async (id: string): Promise<OpportunityIa> => {
    const { data } = await api.get<OpportunityIa>(`/opportunites-ia/${id}`);
    return data;
  },

  /**
   * Statistiques globales
   */
  stats: async (): Promise<OpportunityIaStats> => {
    const { data } = await api.get<OpportunityIaStats>('/opportunites-ia/stats');
    return data;
  },

  /**
   * Liste des pays avec le nombre d'opportunités
   */
  countries: async (): Promise<OpportunityIaCountry[]> => {
    const { data } = await api.get<OpportunityIaCountry[]>(
      '/opportunites-ia/countries',
    );
    return data;
  },
};