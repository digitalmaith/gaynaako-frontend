// src/features/documents/components/DocumentRow.tsx
import { Eye, RefreshCw, Upload, Trash2 } from "lucide-react";
import { documentStatusStyles } from "../documentStatus";
import type { DocumentViewItem } from "../types";

interface DocumentRowProps {
  item: DocumentViewItem;
  onUpload: (item: DocumentViewItem) => void;
  onDelete: (item: DocumentViewItem) => void;
  onView: (item: DocumentViewItem) => void;
  viewLoading?: boolean;
}

function buildDetail(item: DocumentViewItem): string {
  const document = item.document;
  if (!document) return "Document non fourni";

  const addedLabel = `ajouté le ${new Date(document.dateAjout).toLocaleDateString("fr-FR")}`;

  if (item.status === "expire" && document.dateExpiration) {
    return `${document.nomFichier} · expiré le ${new Date(document.dateExpiration).toLocaleDateString("fr-FR")}`;
  }

  if (item.status === "bientot_expire" && document.dateExpiration) {
    return `${document.nomFichier} · expire le ${new Date(document.dateExpiration).toLocaleDateString("fr-FR")}`;
  }

  return `${document.nomFichier} · ${addedLabel}`;
}

export function DocumentRow({ item, onUpload, onDelete, onView, viewLoading }: DocumentRowProps) {
  const style = documentStatusStyles[item.status];
  const Icon = style.icon;
  const isMissing = item.status === "non_fourni";
  const document = item.document;

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 py-3.5 last:border-0 dark:border-white/5">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.badge}`}>
        <Icon size={16} strokeWidth={2.2} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
          {item.label}
        </p>
        <p className="truncate text-xs text-slate-400 dark:text-white/40">
          {buildDetail(item)}
        </p>
      </div>

      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}>
        {style.label}
      </span>

      <div className="flex shrink-0 items-center gap-1">
        {document && (
          <button
            onClick={() => onView(item)}
            disabled={viewLoading}
            aria-label="Voir le document"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-40 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
          >
            <Eye size={15} />
          </button>
        )}

        <button
          onClick={() => onUpload(item)}
          aria-label={isMissing ? "Ajouter le document" : "Remplacer le document"}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
        >
          {isMissing ? <Upload size={15} /> : <RefreshCw size={15} />}
        </button>

        {document && (
          <button
            onClick={() => onDelete(item)}
            aria-label="Supprimer le document"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:text-white/40 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <Trash2 size={15} />
          </button>
        )}
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