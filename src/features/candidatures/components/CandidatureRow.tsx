// src/features/candidatures/components/CandidatureRow.tsx
import {
  MapPin,
  ArrowRight,
  Building2,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStatusStyle } from '../candidatureStatus';
import type { Candidature } from '../types';

const BRAND = {
  navy: '#1E2B7A',
  orange: '#E87722',
  green: '#10B981',
  slate: '#94A3B8',
};

function computeDaysLeft(deadline: string | null): number | null {
  if (!deadline) return null;
  const target = new Date(deadline).getTime();
  if (Number.isNaN(target)) return null;
  return Math.ceil((target - Date.now()) / 86_400_000);
}

export function CandidatureRow({ candidature }: { candidature: Candidature }) {
  const style = getStatusStyle(candidature.statut);
  const opp = candidature.opportunite;

  if (!opp) {
    return (
      <div className="flex items-center gap-4 px-4 py-4 text-sm text-slate-400 sm:px-6 dark:text-white/40">
        Opportunité introuvable (candidature {candidature.id.slice(0, 8)})
      </div>
    );
  }

  const titre = opp.title || 'Sans titre';

  const rawScore = candidature.scoreMatching;
  const scoreMatching =
    typeof rawScore === 'number' && Number.isFinite(rawScore)
      ? Math.round(rawScore * 100)
      : null;

  const sectors = opp.sectors
    ? opp.sectors
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const daysLeft = computeDaysLeft(opp.deadline);

  const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7;
  const isExpired = daysLeft !== null && daysLeft < 0;

  return (
    <Link
      to={`/app/candidatures/${candidature.id}`}
      className="group relative block"
    >
      {/* Card wrapper */}
      <div className="relative mx-3 my-2 overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 sm:mx-4 dark:border-white/10 dark:bg-slate-900/40 dark:hover:border-white/20 dark:hover:shadow-black/20">
        {/* Bande décorative gauche */}
        <span
          className="absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover:w-1.5"
          style={{
            background: `linear-gradient(180deg, ${BRAND.navy} 0%, ${BRAND.orange} 100%)`,
          }}
        />

        {/* Layout : contenu | score+statut */}
        <div className="flex items-start gap-4 p-3 pl-4 sm:p-4 sm:pl-5">
          {/* ═══ CONTENU (gauche) ═══ */}
          <div className="min-w-0 flex-1 space-y-2">
            {/* Titre + flèche */}
            <div className="flex items-center gap-2">
              <h3 className="min-w-0 flex-1 truncate text-sm font-semibold leading-tight text-slate-800 transition-colors group-hover:text-[#1E2B7A] sm:text-[15px] dark:text-white dark:group-hover:text-[#7A8FE0]">
                {titre}
              </h3>
              <ArrowRight
                size={14}
                className="hidden shrink-0 -translate-x-3 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#E87722] group-hover:opacity-100 sm:block dark:text-white/30"
              />
            </div>

            {/* Méta-infos */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 sm:gap-x-4 sm:text-xs dark:text-white/50">
              {opp.country && (
                <span className="flex items-center gap-1">
                  <MapPin
                    size={11}
                    style={{ color: BRAND.orange }}
                    strokeWidth={2.5}
                  />
                  <span className="truncate">{opp.country}</span>
                </span>
              )}

              {opp.organization && (
                <span className="flex min-w-0 items-center gap-1">
                  <Building2
                    size={11}
                    style={{ color: BRAND.orange }}
                    strokeWidth={2.5}
                    className="shrink-0"
                  />
                  <span className="truncate">{opp.organization}</span>
                </span>
              )}

              {daysLeft !== null && (
                <span
                  className={`flex items-center gap-1 ${
                    isUrgent ? 'font-semibold text-red-500' : ''
                  } ${isExpired ? 'text-slate-400 line-through dark:text-white/30' : ''}`}
                >
                  <Clock size={11} strokeWidth={2.5} />
                  <span>
                    {isExpired
                      ? 'Expirée'
                      : daysLeft === 0
                        ? "Aujourd'hui"
                        : daysLeft === 1
                          ? 'Demain'
                          : `Dans ${daysLeft} j`}
                  </span>
                </span>
              )}
            </div>

            {/* Secteurs */}
            {sectors.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {sectors.slice(0, 3).map((secteur) => (
                  <span
                    key={secteur}
                    className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium capitalize text-slate-600 dark:bg-white/5 dark:text-white/50"
                  >
                    {secteur}
                  </span>
                ))}
                {sectors.length > 3 && (
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-white/40">
                    +{sectors.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ═══ SCORE + STATUT (droite) ═══ */}
          <div className="flex shrink-0 flex-col items-end gap-2">
            {/* Ligne 1 : Score + Statut côte à côte */}
            <div className="flex items-center gap-2">
              {scoreMatching !== null && <ScorePill score={scoreMatching} />}

              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm sm:px-3 sm:py-1.5 sm:text-xs ${style.badge}`}
              >
                <style.icon size={11} strokeWidth={2.5} />
                {style.label}
              </span>
            </div>

            {/* Ligne 2 : Date de soumission */}
            {candidature.dateSoumission && (
              <span className="text-[10px] text-slate-400 dark:text-white/30">
                Envoyée le{' '}
                {new Date(candidature.dateSoumission).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Score pill ─────────────────────────────────────────────
function ScorePill({ score }: { score: number }) {
  const safeScore = Math.max(0, Math.min(100, score));
  const color =
    safeScore >= 70 ? BRAND.green : safeScore >= 50 ? BRAND.orange : BRAND.slate;

  return (
    <div
      className="flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 text-[11px] font-semibold shadow-sm transition-all hover:scale-105 sm:px-3 sm:py-1.5 sm:text-xs dark:bg-white/5"
      style={{ borderColor: `${color}30` }}
      title={`Score de correspondance : ${safeScore}%`}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 0 3px ${color}20`,
        }}
      />
      <span className="tabular-nums" style={{ color }}>
        {safeScore}%
      </span>
      <span className="hidden text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:inline dark:text-white/40">
        match
      </span>
    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────
export function CandidatureRowSkeleton() {
  return (
    <div className="mx-3 my-2 rounded-xl border border-slate-200/80 bg-white p-4 sm:mx-4 dark:border-white/10 dark:bg-slate-900/40">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200/70 dark:bg-white/5" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200/70 dark:bg-white/5" />
          <div className="flex gap-1.5">
            <div className="h-4 w-12 animate-pulse rounded-md bg-slate-200/70 dark:bg-white/5" />
            <div className="h-4 w-16 animate-pulse rounded-md bg-slate-200/70 dark:bg-white/5" />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/5" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
}