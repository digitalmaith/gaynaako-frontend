// src/features/documents/hooks/useDocuments.ts
import { useCallback, useEffect, useState } from "react";
import { documentsService } from "../services/documents.service";
import { requiredDocumentsByRole } from "../requiredDocuments";
import { useAuthStore } from "@/app/store/authStore";
import type { DocumentViewItem } from "../types";

export function useDocuments() {
  const role = useAuthStore((state) => state.user?.role);
  const [rawDocuments, setRawDocuments] = useState<DocumentViewItem["document"][]>([]);
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
    // On repousse l'appel dans une microtask : les setState de fetchDocuments
    // (setLoading/setError) ne s'exécutent plus de façon synchrone
    // dans la même passe que l'effet lui-même.
    queueMicrotask(() => {
      void fetchDocuments();
    });
  }, [fetchDocuments]);

  const required = role ? requiredDocumentsByRole[role] : [];

  const items: DocumentViewItem[] = required.map((req) => {
    const document = rawDocuments.find((doc) => doc?.type === req.type);
    return {
      type: req.type,
      label: req.label,
      status: document ? "fourni" : "non_fourni",
      document,
    };
  });

  const uploadDocument = async (type: string, libelle: string, file: File) => {
    const existing = rawDocuments.find((doc) => doc?.type === type);
    if (existing) {
      await documentsService.remove(existing.id);
    }
    const uploaded = await documentsService.upload({ type, libelle, file });
    setRawDocuments((prev) => [...prev.filter((doc) => doc?.type !== type), uploaded]);
  };

  const removeDocument = async (documentId: string) => {
    await documentsService.remove(documentId);
    setRawDocuments((prev) => prev.filter((doc) => doc?.id !== documentId));
  };

  return { items, loading, error, refetch: fetchDocuments, uploadDocument, removeDocument };
}