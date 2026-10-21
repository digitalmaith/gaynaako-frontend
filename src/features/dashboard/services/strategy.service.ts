// src/features/dashboard/services/strategy.service.ts
import { api } from '@/shared/services/api';

export interface StrategyOpportunity {
  id: string;
  title: string;
  score_pertinence: number;
  priority_score: number;
  urgency: {
    label: string;
    urgencyLevel: string;
    deadline: string | null;
  };
  category: string;
  categoryLabel: string;
  categoryColor: string;
}

export interface StrategyResponse {
  success: boolean;
  synthesis: {
    profilNom: string;
    statutMarche: string;
    tauxCouvertureMarche: string;
    conseilCle: string;
  };
  roadmap: {
    thisWeek: { label: string; count: number; items: StrategyOpportunity[] };
    next2Weeks: { label: string; count: number; items: StrategyOpportunity[] };
    ongoing: { label: string; count: number; items: StrategyOpportunity[] };
  };
  gapAnalysis: {
    topMarketDemands: Array<{ skill: string; tip: string; demandCount: number }>;
    actionableRecommendations: Array<{ category: string; title: string; description: string }>;
  };
}

export const strategyService = {
  async get(): Promise<StrategyResponse> {
    // L'URL de base (ex: http://localhost:3000/api) est gérée par 'api'
    // Le token JWT est injecté automatiquement par ton intercepteur Axios
    const response = await api.get<StrategyResponse>('/strategy');
    return response.data;
  },
};