export interface OpportunityIa {
  id: string;
  sourceName: string;
  sourceType: 'national' | 'international';
  title: string;
  description: string | null;
  url: string;
  dateOriginal: string | null;
  dateNormalized: string | null;
  country: string | null;
  sectorId: number | null;
  sectors: string | null;
  opportunityType: string | null;
  organization: string | null;
  hasDescription: 'oui' | 'non';
  hasDate: 'oui' | 'non';
  qualityScore: number;
  targetAudience: string | null;
  experienceRequired: string | null;
  budgetRange: string | null;
  urgency: string | null;
  complexityLevel: number;
  suggestedProfiles: string | null;
  deadline: string | null;
  beneficiairesCibles: string | null;
  criteresEligibilite: string | null;
  montantFinancement: string | null;
  documentsNecessaires: string | null;
  informationsComplementaires: string | null;
  collectedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityIaListResponse {
  items: OpportunityIa[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface OpportunityIaStats {
  total: number;
  highQuality: number;
  countries: number;
  sources: number;
}

export interface OpportunityIaCountry {
  country: string;
  count: number;
}

export interface OpportunityIaFilters {
  page?: number;
  limit?: number;
  country?: string;
  sector?: string;
  search?: string;
  sourceType?: 'national' | 'international';
  minQuality?: number;
  opportunityType?: string;
}