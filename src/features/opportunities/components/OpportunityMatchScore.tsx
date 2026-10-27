// src/features/opportunities/components/OpportunityMatchScore.tsx
import { Sparkles, TrendingUp, Check, X } from "lucide-react";

interface Props {
  score: number;
  categoryLabel?: string;
  advice?: string;
  details?: {
    secteurMatch?: boolean;
    motsClesMatch?: boolean;
    localisationMatch?: boolean;
  };
}

export function OpportunityMatchScore({ score, categoryLabel, advice, details }: Props) {
  const color = score >= 80 ? "text-emerald-500" : score >= 60 ? "text-[#E87722]" : "text-slate-400";
  const bg = score >= 80 ? "bg-emerald-50 dark:bg-emerald-500/10" : score >= 60 ? "bg-orange-50 dark:bg-orange-500/10" : "bg-slate-50 dark:bg-white/5";

  return (
    <div className={`rounded-xl border border-slate-200 p-5 dark:border-white/10 ${bg}`}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={16} className={color} />
        <h3 className="font-semibold text-slate-800 dark:text-white">Analyse de l'IA</h3>
      </div>
      
      <div className="flex items-end gap-2 mb-3">
        <span className={`text-4xl font-bold ${color}`}>{score}%</span>
        <span className="text-sm text-slate-500 mb-1 dark:text-white/50">de correspondance</span>
      </div>

      {categoryLabel && (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:bg-white/10 dark:text-white">
          <TrendingUp size={12} className={color} />
          {categoryLabel}
        </div>
      )}

      {advice && (
        <p className="text-sm text-slate-600 dark:text-white/70">
          {advice}
        </p>
      )}

      {/* ✨ Détails du matching (optionnel) */}
      {details && (
        <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-200/50 pt-3 dark:border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/60">
            {details.secteurMatch ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-400" />}
            Secteur
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/60">
            {details.motsClesMatch ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-400" />}
            Mots-clés
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/60">
            {details.localisationMatch ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-400" />}
            Localisation
          </div>
        </div>
      )}
    </div>
  );
}