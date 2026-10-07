// src/features/opportunities/components/OpportunityDetailEligibility.tsx
import { CheckCircle2, AlertTriangle, FileCheck } from 'lucide-react';

interface OpportunityDetailEligibilityProps {
  criteresEligibilite: string | null;
  documentsNecessaires: string | null;
  beneficiairesCibles: string | null;
}

export function OpportunityDetailEligibility({
  criteresEligibilite,
  documentsNecessaires,
  beneficiairesCibles,
}: OpportunityDetailEligibilityProps) {
  const hasAny = criteresEligibilite || documentsNecessaires || beneficiairesCibles;
  if (!hasAny) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800 dark:text-white">
        <CheckCircle2 size={16} className="text-emerald-600" />
        Éligibilité & candidature
      </h2>

      <div className="space-y-4">
        {beneficiairesCibles && (
          <div>
            <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
              <AlertTriangle size={12} />
              Bénéficiaires cibles
            </h3>
            <p className="text-sm text-slate-600 dark:text-white/70">
              {beneficiairesCibles}
            </p>
          </div>
        )}

        {criteresEligibilite && (
          <div>
            <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
              <CheckCircle2 size={12} />
              Critères d'éligibilité
            </h3>
            <p className="whitespace-pre-wrap text-sm text-slate-600 dark:text-white/70">
              {criteresEligibilite}
            </p>
          </div>
        )}

        {documentsNecessaires && (
          <div>
            <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
              <FileCheck size={12} />
              Documents nécessaires
            </h3>
            <p className="whitespace-pre-wrap text-sm text-slate-600 dark:text-white/70">
              {documentsNecessaires}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}