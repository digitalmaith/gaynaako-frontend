import { useCallback, useEffect, useState } from "react";
import { fetchAdminOverview, type AdminOverview } from "../api/admin.api";

export function useAdminOverview() {
  const [data, setData] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runFetch = useCallback(async () => {
    try {
      const res = await fetchAdminOverview();
      setData(res);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load — no synchronous setState here.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetchAdminOverview();
        if (!cancelled) {
          setData(res);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Erreur de chargement");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Manual refetch — this is an event-handler context, so setState is fine.
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    await runFetch();
  }, [runFetch]);

  return { data, loading, error, refetch };
}