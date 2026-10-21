// src/features/dashboard/components/StrategyRoadmap.tsx
import { CalendarDays, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/shared/components/Skeleton";
import type { StrategyResponse } from "../types/strategy";

interface Props {
  roadmap: StrategyResponse["roadmap"] | null;
  loading: boolean;
}

const blocks = [
  { key: "thisWeek" as const, icon: CalendarDays, color: "text-red-500", bg: "bg-red-50" },
  { key: "next2Weeks" as const, icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
  { key: "ongoing" as const, icon: Eye, color: "text-emerald-500", bg: "bg-emerald-50" },
];

export function StrategyRoadmap({ roadmap, loading }: Props) {
  const navigate = useNavigate();

  if (loading) return <Skeleton className="h-64 w-full rounded-xl" />;
  if (!roadmap) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5 overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3 dark:border-white/5">
        <h4 className="font-medium text-slate-700 dark:text-white/80">
          Ma feuille de route
        </h4>
      </div>
      
      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {blocks.map(({ key, icon: Icon, color, bg }) => {
          const block = roadmap[key];
          return (
            <div key={key} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${bg} ${color}`}>
                    <Icon size={14} />
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-white">
                    {block.label}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {block.count}
                </span>
              </div>

              {block.items.length === 0 ? (
                <p className="text-xs text-slate-400 pl-8">Aucune action.</p>
              ) : (
                <div className="space-y-2 pl-8 mt-3">
                  {block.items.map((opp) => (
                    <button
                      key={opp.id}
                      // 🎯 On utilise la route exacte : /app/opportunities/:id
                      onClick={() => navigate(`/app/opportunities/${opp.id}`)}
                      className="w-full text-left rounded-lg p-2 -ml-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <p className="text-xs font-medium text-slate-800 group-hover:text-[#1E2B7A] dark:text-white/80 dark:group-hover:text-white line-clamp-1">
                        {opp.title}
                      </p>
                      <p className="text-[#E87722] font-semibold mt-0.5 text-xs">
                        {opp.score_pertinence}% match
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}