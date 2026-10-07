// src/features/opportunities/components/OpportunitySkeleton.tsx
export function OpportunitySkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
      <div className="mb-3 flex justify-between">
        <div className="h-4 w-20 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
        <div className="h-4 w-12 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
      </div>
      <div className="mb-2 h-5 w-full animate-pulse rounded bg-slate-100 dark:bg-white/5" />
      <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
      <div className="mb-3 space-y-1">
        <div className="h-3 w-full animate-pulse rounded bg-slate-100 dark:bg-white/5" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100 dark:bg-white/5" />
      </div>
      <div className="h-8 w-full animate-pulse rounded bg-slate-100 dark:bg-white/5" />
    </div>
  );
}