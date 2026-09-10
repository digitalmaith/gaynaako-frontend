// src/features/documents/services/documents.service.ts
import { api } from "@/shared/services/api";
import type { UserDocument } from "../types";

export const documentsService = {
  list: async (): Promise<UserDocument[]> => {
    const { data } = await api.get<UserDocument[]>("/users/me/documents");
    return data;
  },

  upload: async (payload: { type: string; libelle: string; file: File }): Promise<UserDocument> => {
    const formData = new FormData();
    formData.append("type", payload.type);
    formData.append("libelle", payload.libelle);
    formData.append("document", payload.file);

    const { data } = await api.post<UserDocument>("/users/me/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  remove: async (documentId: string): Promise<void> => {
    await api.delete(`/users/me/documents/${documentId}`);
  },
};