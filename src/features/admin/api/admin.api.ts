import { api } from "@/shared/services/api"; // adapte selon ton client HTTP

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface AdminOverview {
  utilisateurs: {
    total: number;
    supprimes: number;
    parRole: Record<string, number>;
    parStatut: Record<string, number>;
    nouveauxDerniers7Jours: number;
    nouveauxDerniers30Jours: number;
  };
  emetteurs: {
    total: number;
    parStatut: Record<string, number>;
  };
  opportunites: {
    total: number;
  };
  candidatures: {
    total: number;
    parStatut: Record<string, number>;
  };
  favoris: {
    total: number;
  };
  recommandations: {
    total: number;
  };
}

// ─────────────────────────────────────────────
// Endpoints
// ─────────────────────────────────────────────
export async function fetchAdminOverview(): Promise<AdminOverview> {
  const { data } = await api.get<AdminOverview>("/admin/stats/overview");
  return data;
}