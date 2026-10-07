// src/features/dashboard/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { Search, Bot, FileCheck2, ClipboardList, SlidersHorizontal } from "lucide-react";
import { OpportunityFeedItem } from "../components/OpportunityFeedItem";
import { InsightPromoCard } from "../components/InsightPromoCard";
import { RecentActivity, type ActivityItem } from "../components/RecentActivity";
import { Skeleton } from "@/shared/components/Skeleton";
import { useAuthStore } from "@/app/store/authStore";
import { DashboardChatEntry } from "../components/DashboardChatEntry";
import { useDashboardOpportunities } from "../hooks/useDashboardOpportunities";

const quickActions = [
  { label: "Rechercher", icon: Search, prompt: "Trouve-moi des opportunités correspondant à mon profil" },
  { label: "Assistant IA", icon: Bot, prompt: "Explique-moi pourquoi cette opportunité me correspond" },
  { label: "Vérifier documents", icon: FileCheck2, prompt: "Quels documents me manquent pour être éligible ?" },
  { label: "Mes candidatures", icon: ClipboardList, prompt: "Montre-moi l'état de mes candidatures en cours" },
];

export default function DashboardPage() {
  const { loading: loadingOpps, opportunities, error: oppsError } = useDashboardOpportunities();

  const [loadingActivity, setLoadingActivity] = useState(true);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const user = useAuthStore((state) => state.user);

  // 🎯 Activité récente : encore statique (pas d'API pour l'instant)
  useEffect(() => {
    const timer = setTimeout(() => {
      setActivity([
        { id: "1", time: "Il y a 4h", title: "Nouveau match : Fonds PNUD (94%)" },
        { id: "2", time: "Il y a 13h", title: "Attestation Fiscale expirée" },
        { id: "3", time: "Hier", title: "Candidature USAID passée en «En cours»" },
      ]);
      setLoadingActivity(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto flex max-w-350 gap-6">
      {/* Colonne principale */}
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-2xl font-semibold text-slate-800 dark:text-white">
          Bonjour {user?.prenom ?? ""}
        </h1>

        {/* Barre de recherche / assistant */}
        <div className="mt-5">
          <DashboardChatEntry suggestions={quickActions.map((a) => a.prompt)} />
        </div>

        {/* Fil d'opportunités */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-slate-700 dark:text-white/80">
              Fil d'opportunités
            </h2>
            <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-white/40 dark:hover:text-white/70">
              <SlidersHorizontal size={14} />
              Filtrer
            </button>
          </div>

          <div className="mt-2">
            {oppsError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                {oppsError}
              </div>
            )}

            {loadingOpps ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="border-b border-slate-100 py-4 dark:border-white/5"
                >
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="mt-2 h-3 w-1/3" />
                </div>
              ))
            ) : opportunities.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
                Aucune opportunité disponible pour le moment.
              </div>
            ) : (
              opportunities.map((opp, i) => (
                <OpportunityFeedItem
                  key={opp.id}
                  opportunity={opp}
                  isTop={i === 0}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right rail */}
      <aside className="hidden w-80 shrink-0 space-y-5 xl:block">
        <InsightPromoCard />
        {loadingActivity ? (
          <Skeleton className="h-40 w-full rounded-xl" />
        ) : (
          <RecentActivity items={activity} />
        )}
      </aside>
    </div>
  );
}