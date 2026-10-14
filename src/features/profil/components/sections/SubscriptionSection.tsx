import { CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Abonnement } from '../../types';

interface SubscriptionSectionProps {
  abonnement: Abonnement | null;
  onDiscover?: () => void;
}

export function SubscriptionSection({ abonnement, onDiscover }: SubscriptionSectionProps) {
  if (!abonnement) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/40">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-accent" />
          <h2 className="font-display text-lg font-semibold text-slate-800 dark:text-white">
            Abonnement
          </h2>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white py-12 text-center dark:border-white/10 dark:from-white/5 dark:to-transparent">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-lg">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-white">
              Aucun abonnement actif
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
              Débloquez toutes les fonctionnalités
            </p>
          </div>
          {onDiscover && (
            <button
              type="button"
              onClick={onDiscover}
              className="mt-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent-light hover:shadow-lg"
            >
              Découvrir les plans
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/40">
      <div className="flex items-center gap-2">
        <CreditCard size={18} className="text-accent" />
        <h2 className="font-display text-lg font-semibold text-slate-800 dark:text-white">
          Abonnement
        </h2>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="flex items-start gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light shadow-md">
            <CreditCard size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {abonnement.plan.nom}
              </p>
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                <CheckCircle2 size={10} />
                Actif
              </span>
            </div>
            {abonnement.plan.description && (
              <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                {abonnement.plan.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-white/50">
              <span>
                {abonnement.cycle === 'MENSUEL' ? 'Mensuel' : 'Annuel'} ·{' '}
                <strong className="text-slate-700 dark:text-white">
                  {abonnement.plan.prixMensuel.toLocaleString('fr-FR')} FCFA
                </strong>
              </span>
              {abonnement.dateFin && (
                <span>
                  Renouvellement le{' '}
                  {new Date(abonnement.dateFin).toLocaleDateString('fr-FR')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}