// src/features/dashboard/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { Search, Bot, FileCheck2, ClipboardList, SlidersHorizontal } from "lucide-react";
import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { OpportunityFeedItem } from "../components/OpportunityFeedItem";
import { InsightPromoCard } from "../components/InsightPromoCard";
import { RecentActivity, type ActivityItem } from "../components/RecentActivity";
import type { Opportunity } from "../components/OpportunityCard";
import { Skeleton } from "@/shared/components/Skeleton";
import { useAuthStore } from "@/app/store/authStore";
import { AssistantChatBox } from "@/features/assistant/components/AssistantChatBox";

const quickActions = [
  { label: "Rechercher", icon: Search, prompt: "Trouve-moi des opportunités correspondant à mon profil" },
  { label: "Assistant IA", icon: Bot, prompt: "Explique-moi pourquoi cette opportunité me correspond" },
  { label: "Vérifier documents", icon: FileCheck2, prompt: "Quels documents me manquent pour être éligible ?" },
  { label: "Mes candidatures", icon: ClipboardList, prompt: "Montre-moi l'état de mes candidatures en cours" },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpportunities([
        { id: "1", title: "Fonds d'appui à l'entrepreneuriat féminin", bailleur: "PNUD Sénégal", lieu: "Dakar", echeance: "Dans 6 jours", score: 94 },
        { id: "2", title: "Concours Startup Africa 2026", bailleur: "AfDB", lieu: "Régional", echeance: "Dans 12 jours", score: 81 },
        { id: "3", title: "Subvention agro-transformation", bailleur: "USAID", lieu: "Thiès", echeance: "Dans 20 jours", score: 74 },
        { id: "4", title: "Appel à projets numérique", bailleur: "GIZ", lieu: "Dakar", echeance: "Dans 25 jours", score: 58 },
      ]);
      setActivity([
        { id: "1", time: "Il y a 4h", title: "Nouveau match : Fonds PNUD (94%)" },
        { id: "2", time: "Il y a 13h", title: "Attestation Fiscale expirée" },
        { id: "3", time: "Hier", title: "Candidature USAID passée en \u00abEn cours\u00bb" },
      ]);
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <DashboardLayout
      rightRail={
        <>
          <InsightPromoCard />
          {loading ? (
            <Skeleton className="h-40 w-full rounded-xl" />
          ) : (
            <RecentActivity items={activity} />
          )}
        </>
      }
    >
      <h1 className="font-display text-2xl font-semibold text-slate-800 dark:text-white">
        Bonjour {user?.prenom ?? ""}
      </h1>

      {/* Barre de recherche / assistant */}
      <div className="mt-5">
        <AssistantChatBox
          suggestions={quickActions.map((a) => a.prompt)}
        />
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
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border-b border-slate-100 py-4 dark:border-white/5">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="mt-2 h-3 w-1/3" />
                </div>
              ))
            : opportunities.map((opp, i) => (
                <OpportunityFeedItem key={opp.id} opportunity={opp} isTop={i === 0} />
              ))}
        </div>
      </div>
    </DashboardLayout>
  );
}