// src/features/documents/types.ts
export type ExpirationStatus = "SANS_EXPIRATION" | "VALIDE" | "EXPIRE_BIENTOT" | "EXPIRE";

export interface UserDocument {
  id: string;
  utilisateurId: string;
  type: string;
  libelle: string;
  resourceType: string; // ⚠️ ex: "image" — valeur Cloudinary, pas fiable pour déduire le vrai type de fichier, utiliser mimeType
  url: string; // URL Cloudinary signée, à durée de vie limitée
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