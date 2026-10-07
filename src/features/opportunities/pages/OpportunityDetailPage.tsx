// src/features/opportunities/pages/OpportunityDetailPage.tsx
import { useParams, Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useOpportunityIaDetail } from '../hooks/useOpportunityIaDetail';
import { OpportunityDetailHeader } from '../components/OpportunityDetailHeader';
import { OpportunityDetailInfo } from '../components/OpportunityDetailInfo';
import { OpportunityDetailDescription } from '../components/OpportunityDetailDescription';
import { OpportunityDetailSectors } from '../components/OpportunityDetailSectors';
import { OpportunityDetailEligibility } from '../components/OpportunityDetailEligibility';
import { OpportunityDetailActions } from '../components/OpportunityDetailActions';   // 👈

export default function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { opportunity, loading, error } = useOpportunityIaDetail(id);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#1E2B7A]" />
          <p className="text-sm text-slate-500 dark:text-white/50">
            Chargement de l'opportunité...
          </p>
        </div>
      </div>
    );
  }

  // ❌ Erreur
  if (error || !opportunity) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
            <AlertCircle size={24} className="text-red-600" />
          </div>
          <p className="text-sm font-semibold text-red-700 dark:text-red-300">
            {error ?? 'Opportunité introuvable'}
          </p>
          <Link
            to="/opportunities"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <ArrowLeft size={14} />
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Succès
  return (
    <div className="mx-auto max-w-4xl p-6">
      <OpportunityDetailHeader opportunity={opportunity} />

      

      <div className="mt-6 space-y-6">
        <OpportunityDetailDescription description={opportunity.description} />

        <OpportunityDetailInfo opportunity={opportunity} />

        <OpportunityDetailSectors sectors={opportunity.sectors} />

        <OpportunityDetailEligibility
          criteresEligibilite={opportunity.criteresEligibilite}
          documentsNecessaires={opportunity.documentsNecessaires}
          beneficiairesCibles={opportunity.beneficiairesCibles}
        />

        {/* 👇 NOUVEAU : actions (candidater + chatbot) */}
      <OpportunityDetailActions opportunity={opportunity} />
      </div>
    </div>
  );
}