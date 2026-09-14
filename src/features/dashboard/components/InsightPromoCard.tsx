// src/features/dashboard/components/InsightPromoCard.tsx
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

export function InsightPromoCard() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
      <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-primary to-accent">
        <Sparkles className="text-white/90" size={28} />
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 text-white/70 hover:text-white"
          aria-label="Fermer"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-accent">
          Assistant IA
        </p>
        <h4 className="mt-1 font-display font-semibold text-slate-800 dark:text-white">
          Affinez vos recommandations
        </h4>
        <ul className="mt-2 space-y-1 text-xs text-slate-500 dark:text-white/50">
          <li>• Complétez votre profil pour un meilleur score de matching</li>
          <li>• Ajoutez vos documents pour élargir vos opportunités éligibles</li>
        </ul>
        <button className="mt-3 w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-primary-dark dark:hover:bg-white/90">
          Compléter mon profil
        </button>
      </div>
    </div>
  );
}