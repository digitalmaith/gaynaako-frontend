// src/features/dashboard/types/strategy.ts
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