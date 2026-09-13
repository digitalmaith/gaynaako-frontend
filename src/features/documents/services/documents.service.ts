// src/features/documents/services/documents.service.ts
import { api } from "@/shared/services/api";
import type { UserDocument } from "../types";

interface UploadPayload {
  type: string;
  libelle: string;
  file: File;
  dateExpiration?: string; // format YYYY-MM-DD ⚠️ à confirmer avec le backend
}

export const documentsService = {
  list: async (): Promise<UserDocument[]> => {
    const { data } = await api.get<UserDocument[]>("/users/me/documents");
    return data;
  },

  upload: async (payload: UploadPayload): Promise<UserDocument> => {
    const formData = new FormData();
    formData.append("type", payload.type);
    formData.append("libelle", payload.libelle);
    formData.append("document", payload.file);
    if (payload.dateExpiration) {
      formData.append("dateExpiration", payload.dateExpiration);
    }

    const { data } = await api.post<UserDocument>("/users/me/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  remove: async (documentId: string): Promise<void> => {
    await api.delete(`/users/me/documents/${documentId}`);
  },
};