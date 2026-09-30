import { api } from "@/shared/services/api";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export type UserRole = "PME" | "ONG" | "ADMINISTRATEUR" | "ENTREPRENEUR";
export type UserStatut = "ACTIF" | "EN_ATTENTE" | "SUSPENDU" | "INACTIF";

export interface Secteur {
  id: string;
  nom: string;
}

export interface PME {
  id: string;
  utilisateurId: string;
  nomEntreprise: string;
  logoUrl: string | null;
  secteurs: Secteur[];
}

export interface AdminUser {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  statut: UserStatut;
  dateCreation: string;
  supprimeLe: string | null;
  entrepreneur: unknown | null;
  pme: PME | null;
  ong: unknown | null;
  administrateur: unknown | null;
}

export interface UsersListResponse {
  items: AdminUser[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ListUsersParams {
  inclureSupprimes?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  statut?: UserStatut;
}

// ─────────────────────────────────────────────
// Endpoints
// ─────────────────────────────────────────────
export async function fetchUsers(
  params: ListUsersParams = {}
): Promise<UsersListResponse> {
  const { data } = await api.get<UsersListResponse>("/admin/users", {
    params: {
      inclureSupprimes: params.inclureSupprimes ?? false,
      page: params.page ?? 1,
      limit: params.limit ?? 20,
      ...(params.search ? { search: params.search } : {}),
      ...(params.role ? { role: params.role } : {}),
      ...(params.statut ? { statut: params.statut } : {}),
    },
  });
  return data;
}

export async function fetchUserById(id: string): Promise<AdminUser> {
  const { data } = await api.get<AdminUser>(`/admin/users/${id}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/admin/users/${id}`);
}

export async function restoreUser(id: string): Promise<AdminUser> {
  const { data } = await api.post<AdminUser>(`/admin/users/${id}/restore`);
  return data;
}

export async function updateUserStatut(
  id: string,
  statut: UserStatut
): Promise<AdminUser> {
  const { data } = await api.patch<AdminUser>(`/admin/users/${id}/statut`, {
    statut,
  });
  return data;
}