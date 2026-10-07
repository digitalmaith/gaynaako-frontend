import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  MessageCircle,
  CheckCircle2,
  Loader2,
  X,
} from 'lucide-react';
import type { OpportunityIa } from '../types/opportunity-ia';

interface OpportunityDetailActionsProps {
  opportunity: OpportunityIa;
}

export function OpportunityDetailActions({
  opportunity,
}: OpportunityDetailActionsProps) {
  const navigate = useNavigate();
  const [postulating, setPostulating] = useState(false);
  const [postulated, setPostulated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 🎯 Candidater à cette opportunité
   * → Redirige vers la page de candidature avec l'ID de l'opportunité
   */
  const handlePostuler = async () => {
    setPostulating(true);
    setError(null);

    try {
      // TODO: Appel API pour créer la candidature
      // await candidaturesService.create({ opportuniteId: opportunity.id });

      // Simulation d'un délai
      await new Promise((resolve) => setTimeout(resolve, 800));

      setPostulated(true);

      // Redirection après 1.5s
      setTimeout(() => {
        navigate(`/candidatures/nouvelle?opportuniteId=${opportunity.id}`);
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(`Impossible de candidater : ${msg}`);
    } finally {
      setPostulating(false);
    }
  };

  /**
   * 💬 Échanger avec le chatbot sur cette opportunité
   * → Ouvre /assistant avec le contexte de l'opportunité
   */
  const handleChatAboutOpportunity = () => {
    // On passe l'ID de l'opportunité en query string
    // Le chat pourra le récupérer et l'envoyer dans le contexte
    navigate(`/app/assistant?opportuniteId=${opportunity.id}`);
  };

  return (
    <>
      {/* Actions principales */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {/* 🎯 Candidater */}
        <button
          type="button"
          onClick={handlePostuler}
          disabled={postulating || postulated}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1E2B7A] to-[#E87722] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {postulating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Envoi en cours...
            </>
          ) : postulated ? (
            <>
              <CheckCircle2 size={16} />
              Candidature enregistrée
            </>
          ) : (
            <>
              <Send size={16} />
              Candidater à cette opportunité
            </>
          )}
        </button>

        {/* 💬 Discuter avec le chatbot */}
        <button
          type="button"
          onClick={handleChatAboutOpportunity}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#1E2B7A] bg-white px-5 py-3 text-sm font-bold text-[#1E2B7A] transition hover:bg-[#1E2B7A]/5 active:scale-[0.98] dark:border-[#4A5AA8] dark:bg-transparent dark:text-[#4A5AA8] dark:hover:bg-[#4A5AA8]/10"
        >
          <MessageCircle size={16} />
          Discuter avec l'assistant
        </button>
      </div>

      {/* Erreur */}
      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          <X size={14} />
          {error}
        </div>
      )}
    </>
  );
}