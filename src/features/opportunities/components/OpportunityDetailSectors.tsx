// src/features/opportunities/components/OpportunityDetailSectors.tsx
import { Tag } from 'lucide-react';

interface OpportunityDetailSectorsProps {
  sectors: string | null;
}

export function OpportunityDetailSectors({
  sectors,
}: OpportunityDetailSectorsProps) {
  if (!sectors) return null;

  const list = sectors
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (list.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800 dark:text-white">
        <Tag size={16} className="text-[#1E2B7A] dark:text-[#4A5AA8]" />
        Secteurs
      </h2>

      <div className="flex flex-wrap gap-2">
        {list.map((s) => (
          <span
            key={s}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium capitalize text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}