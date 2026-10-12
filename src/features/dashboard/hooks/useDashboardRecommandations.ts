// src/features/dashboard/hooks/useDashboardRecommandations.ts
import { useEffect, useState } from 'react';
import { recommandationsService } from '@/features/recommandations/services/recommandations.service';
import type { Opportunity } from '../components/OpportunityCard';

const MAX_RECOMMENDATIONS = 5;

/**
 * Transforme une recommandation en `Opportunity` (format d'affichage du dashboard).
 */
function mapToOpportunity(reco: {
  id: string;
  scorePourcentage: number;
  opportunite: {
    id: string;
    titre: string;
    organisation: string | null;
    pays: string | null;
    deadline: string | null;
    qualityScore?: number | null;
  };
}): Opportunity {
  const opp = reco.opportunite;

  const deadlineLabel = opp.deadline
    ? formatDeadline(opp.deadline)
    : 'Date inconnue';

  return {
    id: opp.id,
    title: opp.titre,
    bailleur: opp.organisation ?? 'Source inconnue',
    lieu: opp.pays ?? 'Non précisé',
    echeance: deadlineLabel,
    score: reco.scorePourcentage,   // 🎯 on affiche le score de pertinence IA
  };
}

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

export function useDashboardRecommandations() {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(async () => {
      try {
        const response = await recommandationsService.list({
          limit: MAX_RECOMMENDATIONS,
          minScore: 0.55,
        });

        if (cancelled) return;

        const mapped = response.items.map(mapToOpportunity);
        setOpportunities(mapped);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Erreur inconnue';
        setError(`Impossible de charger les recommandations : ${msg}`);
        console.error('[useDashboardRecommandations]', err);
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