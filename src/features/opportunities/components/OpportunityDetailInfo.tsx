// src/features/opportunities/components/OpportunityDetailInfo.tsx
import {
  Calendar,
  AlertCircle,
  Users,
  Briefcase,
  DollarSign,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';
import type { OpportunityIa } from '../types/opportunity-ia';

interface OpportunityDetailInfoProps {
  opportunity: OpportunityIa;
}

export function OpportunityDetailInfo({
  opportunity,
}: OpportunityDetailInfoProps) {
  const rows: { label: string; value: string | null; icon: React.ElementType }[] = [
    {
      label: 'Type d\'opportunité',
      value: opportunity.opportunityType,
      icon: Layers,
    },
    {
      label: 'Date limite',
      value: opportunity.deadline
        ? new Date(opportunity.deadline).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : null,
      icon: Calendar,
    },
    {
      label: 'Urgence',
      value: opportunity.urgency,
      icon: AlertCircle,
    },
    {
      label: 'Audience cible',
      value: opportunity.targetAudience,
      icon: Users,
    },
    {
      label: 'Expérience requise',
      value: opportunity.experienceRequired,
      icon: Briefcase,
    },
    {
      label: 'Budget',
      value: opportunity.budgetRange,
      icon: DollarSign,
    },
    {
      label: 'Montant',
      value: opportunity.montantFinancement,
      icon: DollarSign,
    },
    {
      label: 'Complexité',
      value: opportunity.complexityLevel
        ? `${opportunity.complexityLevel}/5`
        : null,
      icon: Clock,
    },
  ].filter((r) => r.value);

  if (rows.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800 dark:text-white">
        <FileText size={16} className="text-[#1E2B7A] dark:text-[#4A5AA8]" />
        Informations clés
      </h2>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-white/50">
              <row.icon size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-white/40">
                {row.label}
              </dt>
              <dd className="mt-0.5 text-sm font-medium capitalize text-slate-700 dark:text-white/80">
                {row.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}