// src/features/opportunities/components/OpportunityDetailDescription.tsx
import { FileText } from 'lucide-react';

interface OpportunityDetailDescriptionProps {
  description: string | null;
}

export function OpportunityDetailDescription({
  description,
}: OpportunityDetailDescriptionProps) {
  if (!description) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800 dark:text-white">
        <FileText size={16} className="text-[#1E2B7A] dark:text-[#4A5AA8]" />
        Description
      </h2>

      {/* ⚠️ Retiré 'prose' et 'max-w-none' qui peuvent imposer une hauteur */}
      <div className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
        {description}
      </div>
    </div>
  );
}