import { MapPin, Building2, ChevronRight, CalendarDays } from "lucide-react";
import { MatchScoreRing } from "./MatchScoreRing";
import { Skeleton } from "@/shared/components/Skeleton";
import { cn } from "@/shared/utils/cn";

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
  onClick 
}: OpportunityCardProps) {
  const handleClick = () => {
    onClick?.(opportunity.id);
  };

  // Carte mise en avant (spotlight)
  if (spotlight) {
    return (
      <div 
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark to-primary-darker p-0.5 transition-all duration-300 hover:shadow-xl hover:shadow-primary-dark/20"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className="relative overflow-hidden rounded-2xl bg-primary-dark p-6 text-white lg:p-8">
          {/* Effets de fond */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />
          
          {/* Ligne décorative */}
          <div className="absolute right-0 top-0 h-1 w-32 bg-gradient-to-l from-accent to-transparent" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 items-center rounded-full bg-accent/20 px-3 text-xs font-medium uppercase tracking-wider text-accent-light backdrop-blur-sm">
                  ⭐ Meilleure correspondance
                </span>
              </div>
              
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight transition-colors group-hover:text-accent-light">
                {opportunity.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Building2 size={14} className="shrink-0" />
                <span>{opportunity.bailleur}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="shrink-0 text-accent-light" />
                  {opportunity.lieu}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="shrink-0 text-accent-light" />
                  {opportunity.echeance}
                </span>
                {opportunity.montant && (
                  <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium">
                    {opportunity.montant}
                  </span>
                )}
              </div>

              <button 
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-light hover:scale-105 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              >
                Voir l'opportunité
                <ChevronRight size={16} className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </button>
            </div>

            <div className="flex shrink-0 items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-accent/20 blur-xl" />
                <MatchScoreRing 
                  score={opportunity.score} 
                  size={112} 
                  className="relative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Carte standard
  return (
    <div 
      className={cn(
        "group relative flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 bg-white p-4",
        "transition-all duration-200 hover:border-accent/40 hover:shadow-md hover:shadow-accent/5",
        "hover:translate-y-[-2px] active:scale-[0.99]"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Indicateur de survol */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/0 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <MatchScoreRing 
        score={opportunity.score} 
        size={56} 
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      />
      
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-slate-800 transition-colors group-hover:text-primary-dark">
          {opportunity.title}
        </h4>
        <div className="flex items-center gap-2 truncate text-sm text-slate-400">
          <Building2 size={12} className="shrink-0" />
          <span>{opportunity.bailleur}</span>
        </div>
      </div>

      <div className="hidden shrink-0 text-right text-xs text-slate-400 sm:block">
        <div className="flex items-center justify-end gap-1.5 text-slate-500">
          <CalendarDays size={12} className="shrink-0" />
          <span className="font-medium">{opportunity.echeance}</span>
        </div>
        <div className="mt-0.5 flex items-center justify-end gap-1.5 text-slate-400">
          <MapPin size={12} className="shrink-0" />
          <span>{opportunity.lieu}</span>
        </div>
        {opportunity.montant && (
          <div className="mt-1 text-xs font-semibold text-accent">
            {opportunity.montant}
          </div>
        )}
      </div>

      {/* Flèche d'indication sur survol */}
      <ChevronRight 
        size={18} 
        className="shrink-0 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-accent" 
      />
    </div>
  );
}

// Squelettes de chargement
export function OpportunityCardSkeleton({ spotlight }: { spotlight?: boolean }) {
  if (spotlight) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-primary-dark/10 to-primary-dark/5 p-6 lg:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="w-full max-w-md space-y-3">
            <Skeleton className="h-6 w-44 rounded-full bg-slate-300/60" />
            <Skeleton className="h-8 w-64 bg-slate-300/60" />
            <Skeleton className="h-4 w-48 bg-slate-300/60" />
            <div className="flex flex-wrap gap-4 pt-1">
              <Skeleton className="h-5 w-24 bg-slate-300/60" />
              <Skeleton className="h-5 w-28 bg-slate-300/60" />
              <Skeleton className="h-5 w-20 bg-slate-300/60" />
            </div>
            <Skeleton className="h-11 w-44 rounded-full bg-slate-300/60" />
          </div>
          <Skeleton className="h-28 w-28 shrink-0 rounded-full bg-slate-300/60" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
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