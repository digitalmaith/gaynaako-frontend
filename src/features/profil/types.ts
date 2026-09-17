// src/features/profil/types.ts
import type { Role, Statut, User } from "@/features/auth/types/auth.types";

export interface Secteur {
  id: string;
  nom: string;
}

export interface UpdatePmeProfilePayload {
  nomEntreprise?: string;
  secteurIds?: string[];
  logo?: File;
}

export type { User, Role, Statut };
