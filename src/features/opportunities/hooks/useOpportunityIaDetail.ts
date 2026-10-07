// src/features/opportunities/hooks/useOpportunityIaDetail.ts
import { useCallback, useEffect, useState } from 'react';
import { opportunitiesIaService } from '../services/opportunities-ia.service';
import type { OpportunityIa } from '../types/opportunity-ia';

export function useOpportunityIaDetail(id: string | undefined) {
  const [opportunity, setOpportunity] = useState<OpportunityIa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) {
      setError('ID manquant');
      setLoading(false);
      return;
    }

    try {
      const data = await opportunitiesIaService.getById(id);
      setOpportunity(data);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(`Impossible de charger l'opportunité : ${msg}`);
      console.error('[useOpportunityIaDetail] Erreur:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  return { opportunity, loading, error };
}