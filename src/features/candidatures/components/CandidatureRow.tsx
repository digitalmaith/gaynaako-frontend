// src/features/candidatures/components/CandidatureRow.tsx
import { MapPin, Calendar } from "lucide-react";
import { getStatusStyle } from "../candidatureStatus";
import type { Candidature } from "../types";

export function CandidatureRow({ candidature }: { candidature: Candidature }) {
  const style = getStatusStyle(candidature.statut);
  const Icon = style.icon;
  const { opportunite } = candidature;

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 py-4 last:border-0 dark:border-white/5">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-800 dark:text-white">
          {opportunite.titre}
        </p>
        <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400 dark:text-white/40">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {opportunite.pays}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> Échéance le{" "}
            {new Date(opportunite.dateLimite).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>

      <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}>
        <Icon size={12} strokeWidth={2.2} />
        {style.label}
      </span>
    </div>
  );
}

export function CandidatureRowSkeleton() {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-0 dark:border-white/5">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200/70" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200/70" />
      </div>
      <div className="h-6 w-24 shrink-0 animate-pulse rounded-full bg-slate-200/70" />
    </div>
  );
}