// src/features/opportunities/components/OpportunityDetailHeader.tsx
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Building2, MapPin } from 'lucide-react';
import type { OpportunityIa } from '../types/opportunity-ia';

interface OpportunityDetailHeaderProps {
  opportunity: OpportunityIa;
}

export function OpportunityDetailHeader({
  opportunity,
}: OpportunityDetailHeaderProps) {
  const qualityColor =
    opportunity.qualityScore >= 80
      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10'
      : opportunity.qualityScore >= 60
        ? 'text-amber-600 bg-amber-50 dark:bg-amber-500/10'
        : 'text-slate-600 bg-slate-50 dark:bg-white/5';

  return (
    <div className="mb-6">
      {/* Breadcrumb retour */}
      <Link
        to="/app/opportunities"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-[#1E2B7A] dark:text-white/50 dark:hover:text-white"
      >
        <ArrowLeft size={14} />
        Retour aux opportunités
      </Link>

      {/* Bandeau source + score */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-white/5 dark:text-white/70">
          <Building2 size={12} />
          {opportunity.sourceName}
        </span>
        <span
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${qualityColor}`}
        >
          Qualité {opportunity.qualityScore}/100
        </span>
        {opportunity.sourceType === 'international' && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            International
          </span>
        )}
      </div>

      {/* Titre */}
      <h1 className="mb-4 text-2xl font-bold leading-tight text-slate-900 dark:text-white">
        {opportunity.title}
      </h1>

      {/* Meta */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-white/50">
        {opportunity.country && (
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {opportunity.country}
          </span>
        )}
        {opportunity.organization && (
          <span className="flex items-center gap-1.5">
            <Building2 size={14} />
            {opportunity.organization}
          </span>
        )}
      </div>

      {/* CTA */}
      <a
        href={opportunity.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#1E2B7A] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Voir l'opportunité source
        <ExternalLink size={14} />
      </a>
    </div>
  );
}