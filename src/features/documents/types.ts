export interface UserDocument {
  id: string;
  utilisateurId: string;
  type: string;
  libelle: string;
  url: string;
  nomFichier: string;
  mimeType: string;
  tailleOctets: number;
  dateAjout: string;
}

export interface RequiredDocument {
  type: string;
  label: string;
}

export type DocumentViewStatus = "fourni" | "non_fourni";

export interface DocumentViewItem {
  type: string;
  label: string;
  status: DocumentViewStatus;
  document?: UserDocument;
}