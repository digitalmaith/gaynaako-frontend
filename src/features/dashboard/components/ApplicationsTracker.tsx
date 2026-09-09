// src/features/dashboard/components/ApplicationsTracker.tsx
import { Skeleton } from "@/shared/components/Skeleton";

type Status = "a_examiner" | "en_cours" | "soumis" | "expire";

const statusConfig: Record<Status, { label: string; className: string }> = {
  a_examiner: { label: "À examiner", className: "bg-slate-100 text-slate-600" },
  en_cours: { label: "En cours", className: "bg-accent/10 text-accent-dark" },
  soumis: { label: "Soumis", className: "bg-emerald-50 text-emerald-600" },
  expire: { label: "Expiré", className: "bg-red-50 text-red-500" },
};

export interface Application {
  id: string;
  title: string;
  status: Status;
}

export function ApplicationsTracker({ items }: { items: Application[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h4 className="font-medium text-slate-700">Mes candidatures</h4>
      <ul className="mt-4 divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-3">
            <span className="text-sm text-slate-700">{item.title}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig[item.status].className}`}
            >
              {statusConfig[item.status].label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ApplicationsTrackerSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <Skeleton className="h-4 w-32" />
      <div className="mt-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}