// src/features/profil/services/profile.service.ts
import { api } from "@/shared/services/api";
import type { Secteur, UpdatePmeProfilePayload, User } from "../types";

export const profileService = {
  getMe: async (): Promise<User> => {
    const { data } = await api.get<User>("/users/me");
    return data;
  },

  // ⚠️ verbe à confirmer (PATCH supposé)
  updatePmeProfile: async (payload: UpdatePmeProfilePayload): Promise<User> => {
    const formData = new FormData();
    if (payload.nomEntreprise) formData.append("nomEntreprise", payload.nomEntreprise);
    payload.secteurIds?.forEach((id) => formData.append("secteurIds", id));
    if (payload.logo) formData.append("logo", payload.logo);

    const { data } = await api.patch<User>("/users/me/pme-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  // ⚠️ endpoint à confirmer côté backend
  getSecteurs: async (): Promise<Secteur[]> => {
    const { data } = await api.get<Secteur[]>("/secteurs");
    return data;
  },
};