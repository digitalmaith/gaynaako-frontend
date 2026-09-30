// src/features/admin/components/UsersPagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UsersPaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly total: number;
  readonly onPageChange: (page: number) => void;
}

export function UsersPagination({
  page,
  totalPages,
  total,
  onPageChange,
}: UsersPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-white/10">
      <p className="text-xs text-slate-500 dark:text-white/50">
        Page <span className="font-semibold">{page}</span> sur {totalPages} ·{" "}
        {total} résultats
      </p>
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white/60 dark:hover:border-accent/30 dark:hover:text-accent"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white/60 dark:hover:border-accent/30 dark:hover:text-accent"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}