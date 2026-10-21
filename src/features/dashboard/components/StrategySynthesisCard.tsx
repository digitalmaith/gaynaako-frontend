// src/features/dashboard/components/StrategySynthesisCard.tsx
import { Sparkles, TrendingUp } from "lucide-react";
import { Skeleton } from "@/shared/components/Skeleton";

interface Props {
  synthesis: {
    profilNom: string;
    statutMarche: string;
    tauxCouvertureMarche: string;
    conseilCle: string;
  } | null;
  loading: boolean;
}

export function StrategySynthesisCard({ synthesis, loading }: Props) {
  if (loading) return <Skeleton className="h-32 w-full rounded-2xl" />;
  if (!synthesis) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E2B7A] to-[#2A3A8F] p-6 text-white shadow-lg">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#E87722]/20 blur-2xl" />
      
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
          <Sparkles size={12} className="text-[#E87722]" />
          Stratégie IA
        </span>
        
        <h3 className="mt-3 font-display text-xl font-bold">
          {synthesis.statutMarche === "EXCELLENT" ? "🚀 Vous êtes en très bonne position !" : "🎯 Voici votre plan d'action"}
        </h3>
        <p className="mt-1 text-sm text-white/70">{synthesis.tauxCouvertureMarche}</p>
        
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-white/5 p-3 text-sm backdrop-blur-sm">
          <TrendingUp size={16} className="mt-0.5 shrink-0 text-[#E87722]" />
          <p className="text-white/90">{synthesis.conseilCle}</p>
        </div>
      </div>
    </div>
  );
}