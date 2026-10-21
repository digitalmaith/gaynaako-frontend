// src/features/dashboard/components/GapAnalysisCard.tsx
import { Lightbulb, ArrowRight } from "lucide-react";
import { Skeleton } from "@/shared/components/Skeleton";
import type { StrategyResponse } from "../types/strategy";

interface Props {
  gapAnalysis: StrategyResponse["gapAnalysis"] | null;
  loading: boolean;
}

export function GapAnalysisCard({ gapAnalysis, loading }: Props) {
  if (loading) return <Skeleton className="h-40 w-full rounded-xl" />;
  if (!gapAnalysis || gapAnalysis.topMarketDemands.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-[#E87722]" />
        <h4 className="font-medium text-slate-700 dark:text-white/80">Compétences à valoriser</h4>
      </div>
      <ul className="space-y-3">
        {gapAnalysis.topMarketDemands.slice(0, 3).map((gap) => (
          <li key={gap.skill} className="text-sm">
            <p className="font-semibold text-slate-800 dark:text-white">{gap.skill}</p>
            <p className="text-xs text-slate-500 dark:text-white/50">{gap.tip}</p>
          </li>
        ))}
      </ul>
      
      {gapAnalysis.actionableRecommendations.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-white/5">
          <button className="flex w-full items-center justify-between rounded-lg bg-[#E87722]/10 px-3 py-2 text-xs font-medium text-[#E87722] hover:bg-[#E87722]/20">
            {gapAnalysis.actionableRecommendations[0].title}
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}