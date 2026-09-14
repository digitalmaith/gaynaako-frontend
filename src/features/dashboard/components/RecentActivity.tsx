// src/features/dashboard/components/RecentActivity.tsx
export interface ActivityItem {
  id: string;
  time: string;
  title: string;
}

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
      <h4 className="font-medium text-slate-700 dark:text-white/80">
        Activité récente
      </h4>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <div>
              <p className="text-xs text-slate-400 dark:text-white/30">{item.time}</p>
              <p className="text-sm text-slate-700 dark:text-white/70">{item.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}