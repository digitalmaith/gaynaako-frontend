// src/features/dashboard/components/ProfileCompletionCard.tsx
import { Skeleton } from "@/shared/components/Skeleton";

export function ProfileCompletionCard({ percent }: { percent: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-slate-700">Profil</h4>
        <span className="font-display text-sm font-semibold text-accent">
          {percent}%
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Complétez votre profil pour affiner vos recommandations.
      </p>
    </div>
  );
}

export function ProfileCompletionCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
      </div>
      <Skeleton className="mt-3 h-1.5 w-full rounded-full" />
      <Skeleton className="mt-3 h-3 w-4/5" />
    </div>
  );
}