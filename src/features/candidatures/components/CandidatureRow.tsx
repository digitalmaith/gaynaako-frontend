// src/features/candidatures/components/CandidatureRow.tsx
import { MapPin, Calendar, ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getStatusStyle } from "../candidatureStatus";
import type { Candidature } from "../types";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  orangeSoft: "#FDF0E6",
  navySoft: "#EEF0FA",
  green: "#10B981",
};

export function CandidatureRow({ candidature }: { candidature: Candidature }) {
  const style = getStatusStyle(candidature.statut);
  const Icon = style.icon;
  const { opportunite } = candidature;

  // 🎯 Couleur du score (vert si élevé, orange moyen, gris faible)
  const getScoreColor = (score: number) => {
    if (score >= 80) return BRAND.green;
    if (score >= 60) return BRAND.orange;
    return "#94A3B8";
  };

  return (
    <Link
      to={`/app/candidatures/${candidature.id}`}
      className="group flex flex-wrap items-center gap-4 px-4 py-4 transition-colors hover:bg-slate-50/70 dark:hover:bg-white/5"
    >
      {/* ===== COLONNE PRINCIPALE ===== */}
      <div className="min-w-0 flex-1">
        {/* Titre */}
        <div className="flex items-start gap-2">
          <h3 className="min-w-0 flex-1 truncate font-medium text-slate-800 transition-colors group-hover:text-[#1E2B7A] dark:text-white dark:group-hover:text-white/90">
            {opportunite.titre}
          </h3>

          {/* Flèche apparaît au survol */}
          <ArrowRight
            size={16}
            className="mt-0.5 shrink-0 -translate-x-2 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 dark:text-white/30"
          />
        </div>

        {/* Méta-infos */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 dark:text-white/40">
          <span className="flex items-center gap-1">
            <MapPin size={12} style={{ color: BRAND.orange }} />
            {opportunite.pays}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} style={{ color: BRAND.orange }} />
            Échéance le{" "}
            {new Date(opportunite.dateLimite).toLocaleDateString("fr-FR")}
          </span>
          {opportunite.emetteur?.nom && (
            <span className="flex items-center gap-1">
              <Building2 size={12} style={{ color: BRAND.orange }} />
              <span className="truncate">{opportunite.emetteur.nom}</span>
            </span>
          )}
        </div>
      </div>

      {/* ===== SCORE DE MATCHING ===== */}
      {opportunite.scoreMatching !== null && (
        <div
          className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold transition group-hover:border-slate-300 dark:border-white/10 dark:bg-white/5"
          title={`Score de correspondance : ${opportunite.scoreMatching}%`}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: getScoreColor(opportunite.scoreMatching),
              boxShadow: `0 0 0 3px ${getScoreColor(opportunite.scoreMatching)}33`,
            }}
          />
          <span
            style={{ color: getScoreColor(opportunite.scoreMatching) }}
            className="tabular-nums"
          >
            {opportunite.scoreMatching}%
          </span>
          <span className="hidden text-slate-400 sm:inline dark:text-white/40">
            match
          </span>
        </div>
      )}

      {/* ===== STATUT ===== */}
      <span
        className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}
      >
        <Icon size={12} strokeWidth={2.2} />
        {style.label}
      </span>
    </Link>
  );
}

export function CandidatureRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-4">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200/70 dark:bg-white/5" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200/70 dark:bg-white/5" />
      </div>
      <div className="h-7 w-20 shrink-0 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/5" />
      <div className="h-6 w-24 shrink-0 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/5" />
    </div>
  );
}