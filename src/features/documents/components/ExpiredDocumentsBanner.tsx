// src/features/documents/components/ExpiredDocumentsBanner.tsx
import { AlertTriangle } from "lucide-react";
import type { DocumentViewItem } from "../types";

export function ExpiredDocumentsBanner({ items }: { items: DocumentViewItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 dark:border-red-500/20 dark:bg-red-500/10">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
      <div className="min-w-0">
        <p className="text-sm font-medium text-red-700 dark:text-red-300">
          {items.length === 1
            ? "1 document a expiré"
            : `${items.length} documents ont expiré`}
        </p>
        <p className="mt-0.5 truncate text-xs text-red-600/70 dark:text-red-300/60">
          {items.map((item) => item.label).join(" · ")} — renouvelez-les pour rester éligible.
        </p>
      </div>
    </div>
  );
}