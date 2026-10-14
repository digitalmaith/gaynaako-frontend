// src/features/candidatures/types.ts

export type CandidatureStatut =
  | 'BROUILLON'
  | 'SOUMISE'
  | 'EN_COURS'
  | 'ACCEPTEE'
  | 'REJETEE';

export interface OpportuniteScrapee {
  id: string;
  oldId: string | null;
  sourceName: string;
  sourceType: string;
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
  hasDescription: string | null;
  hasDate: string | null;
  qualityScore: number | null;
  targetAudience: string | null;
  experienceRequired: string | null;
  budgetRange: string | null;
  urgency: string | null;
  complexityLevel: number | null;
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

export interface Candidature {
  id: string;
  statut: CandidatureStatut;
  dateSoumission: string | null;
  dateCreation: string;
  utilisateurId: string;
  opportuniteId: string;
  opportunite: OpportuniteScrapee | null;
  scoreMatching: number | null; 
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ⬇️ NOUVEAU (générique, réutilisable)
export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}