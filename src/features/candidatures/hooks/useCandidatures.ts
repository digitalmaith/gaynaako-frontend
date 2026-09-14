import { useCallback, useEffect, useState } from "react";
import { candidaturesService } from "../services/candidatures.service";
import type { Candidature, PaginationMeta } from "../types";

const PAGE_SIZE = 20;

export function useCandidatures() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (targetPage: number) => {
    setError(null);
    setLoading(true);
    try {
      const response = await candidaturesService.list(targetPage, PAGE_SIZE);
      setCandidatures(response.items);
      setMeta(response.meta);
    } catch {
      setError("Impossible de charger vos candidatures pour le moment.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchPage(page);
    });
  }, [page, fetchPage]);

  const goToPage = (targetPage: number) => {
    if (meta && (targetPage < 1 || targetPage > meta.totalPages)) return;
    setPage(targetPage);
  };

  return {
    candidatures,
    meta,
    page,
    loading,
    error,
    refetch: () => fetchPage(page),
    goToPage,
  };
}