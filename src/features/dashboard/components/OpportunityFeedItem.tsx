// src/features/dashboard/components/OpportunityFeedItem.tsx
import { Clock, MapPin } from "lucide-react";
import type { Opportunity } from "./OpportunityCard";

const scoreDot = (score: number) => {
  if (score >= 85) return "bg-emerald-500";
  if (score >= 65) return "bg-amber-500";
  return "bg-slate-400";
};

export function OpportunityFeedItem({ opportunity, isTop }: { opportunity: Opportunity; isTop?: boolean }) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-0 dark:border-white/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium text-accent hover:underline">
              {opportunity.title}
            </h3>
            {isTop && (
              <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                Meilleure correspondance
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-white/40">
            {opportunity.bailleur}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-white/60">
          <span className={`h-2 w-2 rounded-full ${scoreDot(opportunity.score)}`} />
          {opportunity.score}%
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400 dark:text-white/30">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {opportunity.lieu}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {opportunity.echeance}
        </span>
      </div>
    </div>
  );
}