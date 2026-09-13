// src/features/documents/types.ts
export type ExpirationStatus = "SANS_EXPIRATION" | "VALIDE" | "EXPIRE_BIENTOT" | "EXPIRE";

export interface UserDocument {
  id: string;
  utilisateurId: string;
  type: string;
  libelle: string;
  url: string;
  nomFichier: string;
  mimeType: string;
  tailleOctets: number;
  dateExpiration: string | null;
  statutExpiration: ExpirationStatus;
  dateAjout: string;
}

export interface RequiredDocument {
  type: string;
  label: string;
}

export type DocumentViewStatus = "fourni" | "non_fourni" | "bientot_expire" | "expire";

export interface DocumentViewItem {
  type: string;
  label: string;
  status: DocumentViewStatus;
  document?: UserDocument;
}