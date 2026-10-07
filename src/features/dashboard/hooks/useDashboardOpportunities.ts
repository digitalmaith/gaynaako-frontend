// src/features/dashboard/hooks/useDashboardOpportunities.ts
import { useEffect, useState } from 'react';
import { opportunitiesIaService } from '@/features/opportunities/services/opportunities-ia.service';
import type { Opportunity } from '../components/OpportunityCard';

const MAX_OPPORTUNITIES = 5;

/**
 * Transforme une opportunité IA (anglais) en `Opportunity` (français) 
 * pour l'affichage du dashboard.
 */
function mapToOpportunity(opp: {
  id: string;
  title: string;
  organization: string | null;
  sourceName: string;
  country: string | null;
  deadline: string | null;
  qualityScore: number;
}): Opportunity {
  const deadlineLabel = opp.deadline
    ? formatDeadline(opp.deadline)
    : 'Date inconnue';

  return {
    id: opp.id,
    title: opp.title,
    bailleur: opp.organization ?? opp.sourceName ?? 'Source inconnue',
    lieu: opp.country ?? 'Non précisé',
    echeance: deadlineLabel,
    score: opp.qualityScore,
  };
}

/**
 * Formate la deadline en "Dans X jours" ou en date courte.
 */
function formatDeadline(deadline: string): string {
  const now = new Date();
  const target = new Date(deadline);
  const diffDays = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Expirée';
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Demain';
  if (diffDays <= 30) return `Dans ${diffDays} jours`;

  return target.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function useDashboardOpportunities() {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(async () => {
      try {
        // 👇 Appel à l'API opportunités IA (par défaut : tri par qualité)
        const response = await opportunitiesIaService.list({
          limit: MAX_OPPORTUNITIES,
          minQuality: 50, // garde seulement les bonnes
        });

        if (cancelled) return;

        const mapped = response.items.map(mapToOpportunity);
        setOpportunities(mapped);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Erreur inconnue';
        setError(`Impossible de charger les opportunités : ${msg}`);
        console.error('[useDashboardOpportunities]', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, opportunities, error };
}