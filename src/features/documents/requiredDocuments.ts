// src/features/documents/requiredDocuments.ts
import { Role } from "@/features/auth/types/auth.types";
import type { RequiredDocument } from "./types";

export const requiredDocumentsByRole: Record<Role, RequiredDocument[]> = {
  [Role.ENTREPRENEUR]: [
    { type: "PIECE_IDENTITE", label: "Pièce d'identité (CNI ou passeport)" },
    { type: "REGISTRE_COMMERCE", label: "RCCM" },
    { type: "NINEA", label: "NINEA" },
    { type: "ATTESTATION_FISCALE", label: "Quitus fiscal" },
    { type: "ATTESTATION_SOCIALE", label: "Attestation de régularité sociale (IPRES)" },
    { type: "CV", label: "CV détaillé de l'entrepreneur" },
    { type: "BUSINESS_PLAN", label: "Business Plan / Pitch Deck" },
    { type: "ETATS_FINANCIERS", label: "États financiers ou prévisionnel" },
    { type: "PORTFOLIO", label: "Preuves de traction / portfolio" },
    { type: "RIB", label: "RIB professionnel" },
  ],

  [Role.PME]: [
    { type: "STATUTS_ENTREPRISE", label: "Statuts de la société" },
    { type: "REGISTRE_COMMERCE", label: "RCCM" },
    { type: "NINEA", label: "NINEA" },
    { type: "ATTESTATION_FISCALE", label: "Quitus fiscal" },
    { type: "ATTESTATION_SOCIALE", label: "Attestations sociales (IPRES)" },
    { type: "ETATS_FINANCIERS", label: "États financiers certifiés (2-3 derniers exercices)" },
    { type: "ORGANIGRAMME", label: "Organigramme et CV des dirigeants" },
    { type: "COMPANY_PROFILE", label: "Dossier de présentation institutionnelle" },
    { type: "REFERENCES_CLIENTS", label: "Références clients et attestations de bonne fin" },
    { type: "RIB", label: "RIB de la PME" },
  ],

  [Role.ONG]: [
    { type: "RECEPISSE", label: "Récépissé de déclaration / reconnaissance officielle" },
    { type: "STATUTS_ENTREPRISE", label: "Statuts et règlement intérieur" },
    { type: "AGREMENT", label: "Agrément technique / accord de siège" },
    { type: "NINEA", label: "NINEA" },
    { type: "REGISTRE_COMMERCE", label: "RCCM" },
    { type: "ATTESTATION_FISCALE", label: "Quitus fiscal" },
    { type: "ATTESTATION_SOCIALE", label: "Attestations sociales (IPRES)" },
    { type: "MANUEL_PROCEDURES", label: "Manuel de procédures administratives et financières" },
    { type: "ETATS_FINANCIERS", label: "États financiers audités" },
    { type: "RAPPORT_ACTIVITES", label: "Rapport annuel d'activités" },
    { type: "CV", label: "CV de l'équipe de direction" },
    { type: "REFERENCES_BAILLEURS", label: "Références de bailleurs / partenaires" },
    { type: "RIB", label: "RIB de l'ONG" },
  ],

  [Role.ADMIN]: [],
};