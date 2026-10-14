// src/features/profil/types.ts

export const Role = {
  ENTREPRENEUR: 'ENTREPRENEUR',
  PME: 'PME',
  ONG: 'ONG',
  ADMIN: 'ADMINISTRATEUR',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const Statut = {
  EN_ATTENTE: 'EN_ATTENTE',
  ACTIF: 'ACTIF',
  SUSPENDU: 'SUSPENDU',
} as const;
export type Statut = (typeof Statut)[keyof typeof Statut];

// ─── Référentiels ────────────────────────────────────────
export interface SecteurRef { id: string; nom: string; }
export interface PaysRef { id: string; nom: string; code: string; }
export interface DomaineInterventionRef { id: string; nom: string; }

// ─── Profils ─────────────────────────────────────────────
export interface EntrepreneurProfile {
  id: string;
  utilisateurId: string;
  secteurId: string;
  paysId: string;
  logoUrl: string | null;
  domaineExpertise: string;
  objectifs: string | null;
  secteur: SecteurRef;
  pays: PaysRef;
}

export interface PmeProfile {
  id: string;
  utilisateurId: string;
  nomEntreprise: string;
  logoUrl: string | null;
  secteurs: SecteurRef[];
}

export interface OngProfile {
  id: string;
  utilisateurId: string;
  nomOrganisation: string;
  mission: string | null;
  logoUrl: string | null;
  domainesIntervention: DomaineInterventionRef[];
}

export interface AdministrateurProfile {
  id: string;
  utilisateurId: string;
  niveauAcces: string;
}

// ─── Documents ───────────────────────────────────────────
export interface UserDocument {
  id: string;
  type: string;
  libelle: string;
  nomFichier: string;
  mimeType: string;
  tailleOctets: number;
  dateExpiration: string | null;
  dateAjout: string;
  url: string | null;
}

// ─── Abonnement ──────────────────────────────────────────
export interface AbonnementPlan {
  id: string;
  nom: string;
  description: string | null;
  prixMensuel: number;
  prixAnnuel: number;
}

export interface Abonnement {
  id: string;
  statut: string;
  cycle: string;
  dateDebut: string | null;
  dateFin: string | null;
  renouvellementAuto: boolean;
  plan: AbonnementPlan;
}

// ─── Statistiques ────────────────────────────────────────
export interface Statistiques {
  candidatures: number;
  favoris: number;
  recommandations: number;
  documents: number;
  opportunitesGerees?: number;
  utilisateursGeres?: number;
}

// ─── Utilisateur complet ─────────────────────────────────
export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: Role;
  statut: Statut;
  dateCreation: string;
  avatarUrl: string | null;
  telephone: string | null;
  entrepreneur: EntrepreneurProfile | null;
  pme: PmeProfile | null;
  ong: OngProfile | null;
  administrateur: AdministrateurProfile | null;
  documents: UserDocument[];
  abonnement: Abonnement | null;
  statistiques: Statistiques;
}

// ─── Payloads ────────────────────────────────────────────
export interface UpdateIdentityPayload {
  nom?: string;
  prenom?: string;
  telephone?: string;
}

export interface UpdateEntrepreneurProfilePayload {
  secteurId?: string;
  paysId?: string;
  domaineExpertise?: string;
  objectifs?: string;
}

export interface UpdatePmeProfilePayload {
  nomEntreprise?: string;
  secteurIds?: string[];
  logo?: File;
}

export interface UpdateOngProfilePayload {
  nomOrganisation?: string;
  domaineInterventionIds?: string[];
  mission?: string;
  logo?: File;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

// Référentiels
export interface Secteur {
  id: string;
  nom: string;
}

export interface Pays {
  id: string;
  nom: string;
  code: string;
}

export interface DomaineIntervention {
  id: string;
  nom: string;
}