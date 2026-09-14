// src/features/dashboard/components/OpportunityCard.tsx
import { MapPin, Building2, ChevronRight, CalendarDays, Sparkles, TrendingUp } from "lucide-react";
import { MatchScoreRing } from "./MatchScoreRing";
import { Skeleton } from "@/shared/components/Skeleton";
import { cn } from "@/shared/utils/cn";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
  green: "#10B981",
};

export interface Opportunity {
  id: string;
  title: string;
  bailleur: string;
  lieu: string;
  echeance: string;
  score: number;
  montant?: string;
  sector?: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  spotlight?: boolean;
  onClick?: (id: string) => void;
}

export function OpportunityCard({
  opportunity,
  spotlight,
  onClick,
}: OpportunityCardProps) {
  const handleClick = () => {
    onClick?.(opportunity.id);
  };

  // 🎯 Couleur du score
  const getScoreColor = (score: number) => {
    if (score >= 80) return BRAND.green;
    if (score >= 60) return BRAND.orange;
    return "#94A3B8";
  };

  const scoreColor = getScoreColor(opportunity.score);

  // ============================================
  // 🌟 CARTE SPOTLIGHT
  // ============================================
  if (spotlight) {
    return (
      <div
        className="group relative cursor-pointer overflow-hidden rounded-2xl p-0.5 transition-all duration-300 hover:shadow-2xl"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.orange})`,
          boxShadow: `0 20px 50px -20px ${BRAND.navy}66`,
        }}
      >
        <div
          className="relative overflow-hidden rounded-[calc(1rem-2px)] p-6 text-white lg:p-8"
          style={{
            background: `linear-gradient(135deg, ${BRAND.navy} 0%, #2A3A8F 60%, ${BRAND.navy} 100%)`,
          }}
        >
          {/* Halos décoratifs */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"
            style={{ background: `${BRAND.orange}55` }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-2xl"
            style={{ background: `${BRAND.orange}33` }}
          />

          {/* Motif pointillé */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Ligne décorative en haut à droite */}
          <div
            className="absolute right-0 top-0 h-1 w-40"
            style={{
              background: `linear-gradient(to left, ${BRAND.orange}, transparent)`,
            }}
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md space-y-1">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
                  style={{
                    background: `${BRAND.orange}33`,
                    color: "#fff",
                  }}
                >
                  <Sparkles size={11} />
                  Meilleure correspondance
                </span>
              </div>

              {/* Titre */}
              <h3
                className="mt-2 font-display text-2xl font-bold leading-tight transition-colors"
                style={{ color: "#fff" }}
              >
                {opportunity.title}
              </h3>

              {/* Émetteur */}
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Building2 size={14} className="shrink-0" style={{ color: BRAND.orange }} />
                <span>{opportunity.bailleur}</span>
              </div>

              {/* Méta-infos */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="shrink-0" style={{ color: BRAND.orange }} />
                  {opportunity.lieu}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="shrink-0" style={{ color: BRAND.orange }} />
                  {opportunity.echeance}
                </span>
                {opportunity.montant && (
                  <span
                    className="rounded-full px-3 py-0.5 text-xs font-semibold backdrop-blur-sm"
                    style={{
                      background: `${BRAND.orange}33`,
                      color: "#fff",
                    }}
                  >
                    {opportunity.montant}
                  </span>
                )}
                {opportunity.sector && (
                  <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium backdrop-blur-sm">
                    {opportunity.sector}
                  </span>
                )}
              </div>

              {/* CTA */}
              <button
                className="group/btn mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: BRAND.orange,
                  boxShadow: `0 10px 25px -5px ${BRAND.orange}88`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              >
                Voir l'opportunité
                <ChevronRight
                  size={16}
                  className="transition-transform duration-200 group-hover/btn:translate-x-1"
                />
              </button>
            </div>

            {/* Score ring */}
            <div className="flex shrink-0 items-center justify-center">
              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-full blur-xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `${BRAND.orange}33`, opacity: 0.6 }}
                />
                <MatchScoreRing
                  score={opportunity.score}
                  size={116}
                  className="relative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // 📄 CARTE STANDARD
  // ============================================
  return (
    <div
      className={cn(
        "group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4",
        "transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Barre latérale colorée au survol */}
      <div
        className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
        style={{ background: scoreColor }}
      />

      {/* Score ring */}
      <MatchScoreRing
        score={opportunity.score}
        size={56}
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      />

      {/* Contenu principal */}
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-semibold text-slate-800 transition-colors group-hover:text-[#1E2B7A] dark:text-white dark:group-hover:text-white/90">
          {opportunity.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 truncate text-sm text-slate-500 dark:text-white/50">
          <Building2 size={12} className="shrink-0" style={{ color: BRAND.orange }} />
          <span className="truncate">{opportunity.bailleur}</span>
        </div>

        {/* Méta-infos mobile (inline) */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 sm:hidden dark:text-white/40">
          <span className="flex items-center gap-1">
            <CalendarDays size={11} style={{ color: BRAND.orange }} />
            {opportunity.echeance}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} style={{ color: BRAND.orange }} />
            {opportunity.lieu}
          </span>
        </div>
      </div>

      {/* Bloc méta-infos desktop */}
      <div className="hidden shrink-0 text-right text-xs text-slate-500 sm:block dark:text-white/40">
        <div className="flex items-center justify-end gap-1.5">
          <CalendarDays size={12} className="shrink-0" style={{ color: BRAND.orange }} />
          <span className="font-medium text-slate-600 dark:text-white/60">
            {opportunity.echeance}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-end gap-1.5">
          <MapPin size={12} className="shrink-0" style={{ color: BRAND.orange }} />
          <span>{opportunity.lieu}</span>
        </div>
        {opportunity.montant && (
          <div
            className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
            style={{
              background: BRAND.orangeSoft,
              color: BRAND.orange,
            }}
          >
            <TrendingUp size={10} />
            {opportunity.montant}
          </div>
        )}
      </div>

      {/* Flèche au survol */}
      <ChevronRight
        size={18}
        className="shrink-0 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 dark:text-white/30"
        style={{ color: "inherit" }}
      />
    </div>
  );
}

// ============================================
// 💀 SQUELETTES DE CHARGEMENT
// ============================================
export function OpportunityCardSkeleton({ spotlight }: { spotlight?: boolean }) {
  if (spotlight) {
    return (
      <div
        className="rounded-2xl p-6 lg:p-8"
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy}22, ${BRAND.orange}11)`,
        }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="w-full max-w-md space-y-3">
            <Skeleton className="h-6 w-44 rounded-full bg-slate-300/60 dark:bg-white/10" />
            <Skeleton className="h-8 w-64 bg-slate-300/60 dark:bg-white/10" />
            <Skeleton className="h-4 w-48 bg-slate-300/60 dark:bg-white/10" />
            <div className="flex flex-wrap gap-4 pt-1">
              <Skeleton className="h-5 w-24 bg-slate-300/60 dark:bg-white/10" />
              <Skeleton className="h-5 w-28 bg-slate-300/60 dark:bg-white/10" />
              <Skeleton className="h-5 w-20 bg-slate-300/60 dark:bg-white/10" />
            </div>
            <Skeleton className="h-11 w-44 rounded-full bg-slate-300/60 dark:bg-white/10" />
          </div>
          <Skeleton className="h-28 w-28 shrink-0 rounded-full bg-slate-300/60 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="hidden sm:block">
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}