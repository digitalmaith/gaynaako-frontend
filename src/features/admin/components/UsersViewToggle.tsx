// src/features/admin/components/UsersViewToggle.tsx
import { LayoutGrid, List } from "lucide-react";

export type ViewMode = "table" | "cards";

interface Props {
  readonly view: ViewMode;
  readonly onChange: (v: ViewMode) => void;
}

export function UsersViewToggle({ view, onChange }: Props) {
  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-white/10 dark:bg-white/5">
      <button
        onClick={() => onChange("table")}
        aria-label="Vue tableau"
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
          view === "table"
            ? "bg-primary text-white dark:bg-accent"
            : "text-slate-500 hover:bg-slate-50 dark:text-white/60 dark:hover:bg-white/5"
        }`}
      >
        <List size={13} />
        Tableau
      </button>
      <button
        onClick={() => onChange("cards")}
        aria-label="Vue cartes"
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
          view === "cards"
            ? "bg-primary text-white dark:bg-accent"
            : "text-slate-500 hover:bg-slate-50 dark:text-white/60 dark:hover:bg-white/5"
        }`}
      >
        <LayoutGrid size={13} />
        Cartes
      </button>
    </div>
  );
}