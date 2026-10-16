// src/features/documents/types.ts

export const TYPE_DOCUMENT = {
  CV: 'CV',
  PIECE_IDENTITE: 'PIECE_IDENTITE',
  REGISTRE_COMMERCE: 'REGISTRE_COMMERCE',
  NINEA: 'NINEA',
  STATUTS_ENTREPRISE: 'STATUTS_ENTREPRISE',
  ATTESTATION_FISCALE: 'ATTESTATION_FISCALE',
  ATTESTATION_SOCIALE: 'ATTESTATION_SOCIALE',
  JUSTIFICATIF_DOMICILE: 'JUSTIFICATIF_DOMICILE',
  ATTESTATION: 'ATTESTATION',
  AUTRE: 'AUTRE',
  BUSINESS_PLAN: 'BUSINESS_PLAN',
  ETATS_FINANCIERS: 'ETATS_FINANCIERS',
  PORTFOLIO: 'PORTFOLIO',
  RIB: 'RIB',
  ORGANIGRAMME: 'ORGANIGRAMME',
  COMPANY_PROFILE: 'COMPANY_PROFILE',
  REFERENCES_CLIENTS: 'REFERENCES_CLIENTS',
  RECEPISSE: 'RECEPISSE',
  AGREMENT: 'AGREMENT',
  MANUEL_PROCEDURES: 'MANUEL_PROCEDURES',
  RAPPORT_ACTIVITES: 'RAPPORT_ACTIVITES',
  REFERENCES_BAILLEURS: 'REFERENCES_BAILLEURS',
} as const;

export type TypeDocument = (typeof TYPE_DOCUMENT)[keyof typeof TYPE_DOCUMENT];

export type ExpirationStatus = "SANS_EXPIRATION" | "VALIDE" | "EXPIRE_BIENTOT" | "EXPIRE";

export interface UserDocument {
  id: string;
  utilisateurId: string;
  type: TypeDocument;       // ⬅️ typé strictement
  libelle: string;
  resourceType: string;
  url: string;
  nomFichier: string;
  mimeType: string;
  tailleOctets: number;
  dateExpiration: string | null;
  statutExpiration: ExpirationStatus;
  dateAjout: string;
}

export interface RequiredDocument {
  type: TypeDocument;       // ⬅️ typé strictement
  label: string;
}

export type DocumentViewStatus = "fourni" | "non_fourni" | "bientot_expire" | "expire";

export interface DocumentViewItem {
  type: TypeDocument;
  label: string;
  status: DocumentViewStatus;
  document?: UserDocument;
}