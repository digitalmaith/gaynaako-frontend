export const Role = {
  ENTREPRENEUR: "ENTREPRENEUR",
  PME: "PME",
  ONG: "ONG",
  ADMIN: "ADMINISTRATEUR",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const Statut = {
  EN_ATTENTE: "EN_ATTENTE",
  ACTIF: "ACTIF",
  SUSPENDU: "SUSPENDU",
} as const;

export type Statut = (typeof Statut)[keyof typeof Statut];

interface SecteurRef {
  id: string;
  nom: string;
}

interface PaysRef {
  id: string;
  nom: string;
  code: string;
}

interface DomaineInterventionRef {
  id: string;
  nom: string;
}

export interface EntrepreneurProfile {
  id: string;
  utilisateurId: string;
  secteurId: string;
  paysId: string;
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

export interface User {
  id: string;
  email: string;
  role: Role;
  statut: Statut;
  dateCreation: string;
  entrepreneur: EntrepreneurProfile | null;
  pme: PmeProfile | null;
  ong: OngProfile | null;
  administrateur: AdministrateurProfile | null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}