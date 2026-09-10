import { Eye, RefreshCw, Upload } from "lucide-react";
import { documentStatusStyles, type DocumentStatus } from "../documentStatus"; 
import type { DocumentEntry } from "../types";



interface DocumentRowProps {
  document: DocumentEntry;
  onAction: (document: DocumentEntry) => void;
}

export function DocumentRow({ document, onAction }: DocumentRowProps) {
  const style = documentStatusStyles[document.status];
  const Icon = style.icon;
  const isMissing = document.status === "non_fourni";

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 py-3.5 last:border-0 dark:border-white/5">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.badge}`}>
        <Icon size={16} strokeWidth={2.2} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
          {document.label}
        </p>
        <p className="truncate text-xs text-slate-400 dark:text-white/40">
          {document.detail}
          {document.updatedAt && ` · Mis à jour le ${document.updatedAt}`}
        </p>
      </div>

      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}>
        {style.label}
      </span>

      <div className="flex shrink-0 items-center gap-1">
        {!isMissing && (
          <button
            aria-label="Voir le document"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
          >
            <Eye size={15} />
          </button>
        )}
        <button
          onClick={() => onAction(document)}
          aria-label={isMissing ? "Ajouter le document" : "Remplacer le document"}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
        >
          {isMissing ? <Upload size={15} /> : <RefreshCw size={15} />}
        </button>
      </div>
    </div>
  );
}

export function DocumentRowSkeleton() {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-3.5 last:border-0 dark:border-white/5">
      <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-200/70" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3.5 w-1/3 animate-pulse rounded bg-slate-200/70" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200/70" />
      </div>
      <div className="h-5 w-20 shrink-0 animate-pulse rounded-full bg-slate-200/70" />
    </div>
  );
}