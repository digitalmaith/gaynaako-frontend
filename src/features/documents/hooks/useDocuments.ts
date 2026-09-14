// src/features/documents/hooks/useDocuments.ts
import { useCallback, useEffect, useState } from "react";
import { documentsService } from "../services/documents.service";
import { requiredDocumentsByRole } from "../requiredDocuments";
import { useAuthStore } from "@/app/store/authStore";
import type { DocumentViewItem, DocumentViewStatus, UserDocument } from "../types";

function computeStatus(document?: UserDocument): DocumentViewStatus {
  if (!document) return "non_fourni";

  switch (document.statutExpiration) {
    case "EXPIRE":
      return "expire";
    case "EXPIRE_BIENTOT":
      return "bientot_expire";
    default:
      return "fourni";
  }
}

export function useDocuments() {
  const role = useAuthStore((state) => state.user?.role);
  const [rawDocuments, setRawDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await documentsService.list();
      setRawDocuments(data);
    } catch {
      setError("Impossible de charger vos documents pour le moment.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchDocuments();
    });
  }, [fetchDocuments]);

  const required = role ? requiredDocumentsByRole[role] : [];

  const items: DocumentViewItem[] = required.map((req) => {
    const document = rawDocuments.find((doc) => doc.type === req.type);
    return {
      type: req.type,
      label: req.label,
      status: computeStatus(document),
      document,
    };
  });

  const expiredItems = items.filter((item) => item.status === "expire");

  const uploadDocument = async (
    type: string,
    libelle: string,
    file: File,
    dateExpiration?: string
  ) => {
    const existing = rawDocuments.find((doc) => doc.type === type);
    if (existing) {
      await documentsService.remove(existing.id);
    }
    const uploaded = await documentsService.upload({ type, libelle, file, dateExpiration });
    setRawDocuments((prev) => [...prev.filter((doc) => doc.type !== type), uploaded]);
  };

  const removeDocument = async (documentId: string) => {
    await documentsService.remove(documentId);
    setRawDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
  };

  // Récupère une URL Cloudinary fraîche juste avant l'affichage (l'URL signée expire)
  const getFreshDocument = async (documentId: string): Promise<UserDocument | undefined> => {
    const base = rawDocuments.find((doc) => doc.id === documentId);
    if (!base) return undefined;

    const freshUrl = await documentsService.getSignedUrl(documentId);
    return { ...base, url: freshUrl };
  };

  return {
    items,
    expiredItems,
    loading,
    error,
    refetch: fetchDocuments,
    uploadDocument,
    removeDocument,
    getFreshDocument,
  };
}