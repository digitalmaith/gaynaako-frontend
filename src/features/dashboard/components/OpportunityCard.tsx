// src/features/dashboard/components/OpportunityCard.tsx
import { MapPin, Clock } from "lucide-react";
import { MatchScoreRing } from "./MatchScoreRing";
import { Skeleton } from "@/shared/components/Skeleton";

export interface Opportunity {
  id: string;
  title: string;
  bailleur: string;
  lieu: string;
  echeance: string;
  score: number;
  montant?: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  spotlight?: boolean;
}

export function OpportunityCard({ opportunity, spotlight }: OpportunityCardProps) {
  if (spotlight) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-primary-dark p-6 text-white lg:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <p className="text-xs font-medium uppercase tracking-wide text-accent-light">
              Meilleure correspondance
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold">
              {opportunity.title}
            </h3>
            <p className="mt-1 text-sm text-white/60">{opportunity.bailleur}</p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {opportunity.lieu}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {opportunity.echeance}
              </span>
            </div>

            <button className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-light">
              Voir l'opportunité
            </button>
          </div>

          <MatchScoreRing score={opportunity.score} size={104} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-accent/40">
      <MatchScoreRing score={opportunity.score} size={52} />
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-slate-800">{opportunity.title}</h4>
        <p className="truncate text-sm text-slate-400">{opportunity.bailleur}</p>
      </div>
      <div className="hidden shrink-0 text-right text-xs text-slate-400 sm:block">
        <p>{opportunity.echeance}</p>
        <p>{opportunity.lieu}</p>
      </div>
    </div>
  );
}

export function OpportunityCardSkeleton({ spotlight }: { spotlight?: boolean }) {
  if (spotlight) {
    return (
      <div className="rounded-2xl bg-primary-dark/5 p-6 lg:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full max-w-md space-y-3">
            <Skeleton className="h-3 w-32 bg-slate-300/60" />
            <Skeleton className="h-7 w-64 bg-slate-300/60" />
            <Skeleton className="h-4 w-40 bg-slate-300/60" />
            <div className="flex gap-4 pt-1">
              <Skeleton className="h-4 w-20 bg-slate-300/60" />
              <Skeleton className="h-4 w-24 bg-slate-300/60" />
            </div>
            <Skeleton className="h-10 w-40 rounded-full bg-slate-300/60" />
          </div>
          <Skeleton className="h-[104px] w-[104px] shrink-0 rounded-full bg-slate-300/60" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <Skeleton className="h-[52px] w-[52px] shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}