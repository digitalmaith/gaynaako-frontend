// src/features/dashboard/components/UpcomingDeadlines.tsx
import { Skeleton } from "@/shared/components/Skeleton";

export interface Deadline {
  id: string;
  title: string;
  date: string;
}

export function UpcomingDeadlines({ items }: { items: Deadline[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h4 className="font-medium text-slate-700">Prochaines échéances</h4>
      <ul className="mt-4 space-y-4">
        {items.map((item, i) => (
          <li key={item.id} className="relative flex gap-3 pl-4">
            <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            {i !== items.length - 1 && (
              <span className="absolute left-[2.5px] top-3 h-full w-px bg-slate-200" />
            )}
            <div>
              <p className="text-sm font-medium text-slate-700">{item.title}</p>
              <p className="text-xs text-slate-400">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UpcomingDeadlinesSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <Skeleton className="h-4 w-40" />
      <div className="mt-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 pl-4">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}