// src/features/dashboard/hooks/useUserStrategy.ts
import { useEffect, useState } from 'react';
import { strategyService, type StrategyResponse } from '../services/strategy.service';

export function useUserStrategy() {
  const [data, setData] = useState<StrategyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(async () => {
      try {
        const response = await strategyService.get();
        if (cancelled) return;
        setData(response);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Erreur inconnue';
        setError(`Impossible de charger la stratégie : ${msg}`);
        console.error('[useUserStrategy]', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}