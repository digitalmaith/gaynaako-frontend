// src/features/documents/services/documents.service.ts
import { api } from "@/shared/services/api";
import type { UserDocument } from "../types";

interface UploadPayload {
  type: string;
  libelle: string;
  file: File;
  dateExpiration?: string;
}

interface SignedUrlResponse {
  url: string;
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

  getSignedUrl: async (documentId: string): Promise<string> => {
    const { data } = await api.get<SignedUrlResponse>(
      `/users/me/documents/${documentId}/url`,
    );
    return data.url;
  },

  /**
   * Récupère le fichier binaire en blob et le transforme en URL locale révocable.
   * À utiliser pour afficher (iframe / <img>) ou télécharger.
   */
  fetchBlob: async (
    documentId: string,
  ): Promise<{ url: string; mimeType: string }> => {
    const response = await api.get(`/users/me/documents/${documentId}/view`, {
      responseType: "blob",
    });

    const mimeType =
      (response.headers["content-type"] as string) || "application/octet-stream";

    const blob = new Blob([response.data], { type: mimeType });
    const url = URL.createObjectURL(blob);

    return { url, mimeType };
  },

  /**
   * Télécharge le document avec son nom d'origine.
   * Révoque l'URL après 60s.
   */
  download: async (documentId: string, filename: string): Promise<void> => {
    const { url } = await documentsService.fetchBlob(documentId);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  },
};