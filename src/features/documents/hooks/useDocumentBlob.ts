// src/features/documents/hooks/useDocumentBlob.ts
import { useEffect, useState } from 'react';
import { documentsService } from '../services/documents.service';

interface UseDocumentBlobResult {
  blobUrl: string | null;
  mimeType: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Récupère le fichier en blob et crée une URL locale révocable.
 * À utiliser pour afficher un PDF/image dans une iframe ou <img>.
 */
export function useDocumentBlob(documentId: string | null): UseDocumentBlobResult {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!documentId) return;

    let cancelled = false;
    let createdUrl: string | null = null;

    queueMicrotask(async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await documentsService.fetchBlob(documentId);

        if (cancelled) {
          URL.revokeObjectURL(result.url);
          return;
        }

        createdUrl = result.url;
        setBlobUrl(result.url);
        setMimeType(result.mimeType);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Impossible de charger le document.',
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [documentId]);

  return { blobUrl, mimeType, loading, error };
}