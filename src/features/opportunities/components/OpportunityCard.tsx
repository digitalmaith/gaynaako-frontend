// src/features/opportunities/components/OpportunityCard.tsx
import { MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { OpportunityIa } from '../types/opportunity-ia';

interface OpportunityCardProps {
  opportunity: OpportunityIa;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { qualityScore } = opportunity;

  const qualityConfig =
    qualityScore >= 80
      ? {
          label: 'Excellente',
          dot: 'bg-emerald-500',
          badge:
            'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20',
        }
      : qualityScore >= 60
        ? {
            label: 'Bonne',
            dot: 'bg-amber-500',
            badge:
              'text-amber-700 bg-amber-50 ring-1 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20',
          }
        : {
            label: 'Standard',
            dot: 'bg-slate-400',
            badge:
              'text-slate-600 bg-slate-50 ring-1 ring-slate-400/20 dark:bg-white/5 dark:text-white/60 dark:ring-white/10',
          };

  const sectors = opportunity.sectors
    ? opportunity.sectors
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3)
    : [];

  const formattedDeadline = opportunity.deadline
    ? new Date(opportunity.deadline).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/40 hover:shadow-xl hover:shadow-orange-500/10 focus-within:border-orange-400/50 focus-within:ring-2 focus-within:ring-orange-400/20 dark:border-white/10 dark:bg-slate-900 dark:hover:border-orange-400/40 dark:hover:shadow-black/20">
      {/* Liseré lumineux orange en haut */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="inline-flex max-w-[60%] items-center gap-1.5 truncate rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-white/5 dark:text-white/60">
          <Sparkles size={10} className="shrink-0 text-orange-500" />
          <span className="truncate">{opportunity.sourceName}</span>
        </span>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${qualityConfig.badge}`}
          title={`Score de qualité : ${qualityScore}/100 — ${qualityConfig.label}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${qualityConfig.dot}`} />
          {qualityScore}
          <span className="font-medium opacity-60">/100</span>
        </span>
      </div>

      {/* Titre */}
      <h3 className="mb-2 line-clamp-2 text-[15px] font-bold leading-snug text-slate-800 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
        {opportunity.title}
      </h3>

      {/* Description */}
      {opportunity.description ? (
        <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-white/50">
          {opportunity.description}
        </p>
      ) : (
        <p className="mb-4 text-xs italic text-slate-400 dark:text-white/30">
          Aucune description disponible
        </p>
      )}

      {/* Secteurs */}
      {sectors.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {sectors.map((s) => (
            <span
              key={s}
              className="rounded-md border border-slate-200/70 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500 transition-colors group-hover:border-orange-400/20 group-hover:bg-orange-50 group-hover:text-orange-700 dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:group-hover:bg-orange-500/10 dark:group-hover:text-orange-300"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Meta */}
      <div className="mb-4 mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-slate-400 dark:text-white/40">
        {opportunity.country && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} className="text-slate-400 dark:text-white/40" />
            {opportunity.country}
          </span>
        )}
        {formattedDeadline && (
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} className="text-slate-400 dark:text-white/40" />
            {formattedDeadline}
          </span>
        )}
      </div>

      {/* Actions */}
      <Link
        to={`/app/opportunities/${opportunity.id}`}
        className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E2B7A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#16215c] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
      >
        Voir le détail
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
        />
      </Link>
    </article>
  );
}