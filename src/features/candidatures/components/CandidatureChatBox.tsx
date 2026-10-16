// src/features/candidatures/components/CandidatureChatBox.tsx
import { Sparkles } from 'lucide-react';
import { AssistantChatBox } from '@/features/assistant/components/AssistantChatBox';
import type { ChatContext } from '@/features/assistant/types';

interface CandidatureChatBoxProps {
  context: ChatContext;
  placeholder?: string;
}

export function CandidatureChatBox({ context, placeholder }: CandidatureChatBoxProps) {
  return (
    <div className="flex h-[420px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/40">
      {/* Header compact — sans mascotte */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-gradient-to-r from-[#1E2B7A]/5 to-[#E87722]/5 px-4 py-3 dark:border-white/5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E2B7A] to-[#E87722] text-white">
          <Sparkles size={13} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-800 dark:text-white">
            Assistant IA
          </p>
          <p className="text-[10px] text-slate-400 dark:text-white/40">
            Connaît votre profil + cette opportunité
          </p>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
      </div>

      {/* Chat — sans empty state */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <AssistantChatBox
          context={context}
          placeholder={placeholder ?? 'Posez votre question...'}
          compact
          hideEmptyState
        />
      </div>
    </div>
  );
}