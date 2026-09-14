import { useCallback, useEffect, useState } from "react";
import { candidaturesService } from "../services/candidatures.service";
import type { Candidature, CandidatureStatut } from "../types";

export function useCandidature(candidatureId: string | undefined) {
  const [candidature, setCandidature] = useState<Candidature | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidature = useCallback(async () => {
    if (!candidatureId) return;
    setError(null);
    setLoading(true);
    try {
      const data = await candidaturesService.getById(candidatureId);
      setCandidature(data);
    } catch {
      setError("Impossible de charger cette candidature.");
    } finally {
      setLoading(false);
    }
  }, [candidatureId]);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchCandidature();
    });
  }, [fetchCandidature]);

  const updateStatut = async (statut: CandidatureStatut) => {
    if (!candidatureId) return;
    const updated = await candidaturesService.updateStatut(candidatureId, statut);
    setCandidature((prev) =>
      prev ? { ...prev, statut: updated.statut, dateSoumission: updated.dateSoumission } : prev
    );
  };

  return { candidature, loading, error, refetch: fetchCandidature, updateStatut };
}