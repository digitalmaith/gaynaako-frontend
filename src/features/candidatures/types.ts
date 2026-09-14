// src/features/candidatures/types.ts

// ⚠️ valeurs à confirmer avec l'enum réel du backend — seule "BROUILLON" est confirmée
export type CandidatureStatut =
  | "BROUILLON"
  | "SOUMISE"
  | "EN_COURS_EXAMEN"
  | "ACCEPTEE"
  | "REJETEE"
  | "EXPIREE";

export interface Secteur {
  id: string;
  nom: string;
}

export interface Emetteur {
  id: string;
  nom: string;
  url: string;
  type: string;
  frequenceCollecte: string;
  dernierScan: string | null;
  statut: string;
  administrateurId: string;
}

export interface Opportunite {
  id: string;
  externalId: string | null;
  titre: string;
  description: string;
  type: string;
  pays: string;
  dateLimite: string;
  criteresEligibilite: string;
  origine: string;
  dateCreation: string;
  supprimeLe: string | null;
  secteurId: string;
  emetteurId: string;
  administrateurId: string;
  secteur: Secteur;
  emetteur: Emetteur;
  scoreMatching: number | null; 
}

export interface Candidature {
  id: string;
  statut: CandidatureStatut;
  dateSoumission: string | null;
  dateCreation: string;
  utilisateurId: string;
  opportuniteId: string;
  opportunite: Opportunite;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}