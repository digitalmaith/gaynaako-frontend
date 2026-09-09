// src/features/dashboard/components/DocumentComplianceCard.tsx

import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

import { Skeleton } from "@/shared/components/Skeleton";

export type DocumentStatus =
  | "valide"
  | "expire"
  | "avertissement"
  | "non_fourni";

export interface DocumentComplianceItem {
  id: string;
  label: string;
  detail: string;
  status: DocumentStatus;
}

const statusStyles: Record<
  DocumentStatus,
  {
    icon: typeof CheckCircle2;
    card: string;
    text: string;
    detail: string;
    badge: string;
  }
> = {
  valide: {
    icon: CheckCircle2,
    card:
      "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10",
    text: "text-emerald-800 dark:text-emerald-300",
    detail: "text-emerald-600/70 dark:text-emerald-300/50",
    badge:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  },

  expire: {
    icon: XCircle,
    card:
      "border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10",
    text: "text-red-800 dark:text-red-300",
    detail: "text-red-600/70 dark:text-red-300/50",
    badge:
      "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300",
  },

  avertissement: {
    icon: AlertTriangle,
    card:
      "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10",
    text: "text-amber-800 dark:text-amber-300",
    detail: "text-amber-600/70 dark:text-amber-300/50",
    badge:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
  },

  non_fourni: {
    icon: Clock,
    card:
      "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5",
    text: "text-slate-600 dark:text-white/70",
    detail: "text-slate-400 dark:text-white/40",
    badge:
      "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-white/50",
  },
};

interface DocumentComplianceCardProps {
  documents: DocumentComplianceItem[];
  onUpload?: (id: string) => void;
}

export function DocumentComplianceCard({
  documents,
  onUpload,
}: DocumentComplianceCardProps) {
  const compliant = documents.filter(
    (doc) => doc.status === "valide",
  ).length;

  const total = documents.length;

  const percent =
    total === 0 ? 0 : Math.round((compliant / total) * 100);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-primary-dark">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck
            size={20}
            className="text-accent"
            strokeWidth={2}
          />

          <h4 className="font-display font-semibold text-slate-800 dark:text-white">
            Conformité Documents
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400 dark:text-white/40">
            {compliant}/{total} conformes
          </span>

          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {documents.map((doc) => {
          const style = statusStyles[doc.status];
          const Icon = style.icon;

          const canUpload =
            doc.status === "non_fourni" ||
            doc.status === "expire";

          return (
            <div
              key={doc.id}
              className={`flex items-start justify-between gap-2 rounded-lg border p-3 ${style.card}`}
            >
              <div className="min-w-0">
                <p
                  className={`truncate text-sm font-semibold ${style.text}`}
                >
                  {doc.label}
                </p>

                <p
                  className={`mt-0.5 truncate text-xs ${style.detail}`}
                >
                  {doc.detail}
                </p>

                {canUpload && onUpload && (
                  <button
                    type="button"
                    onClick={() => onUpload(doc.id)}
                    className="mt-2 text-xs font-medium text-accent hover:underline"
                  >
                    {doc.status === "expire"
                      ? "Remplacer"
                      : "Ajouter"}
                  </button>
                )}
              </div>

              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${style.badge}`}
              >
                <Icon size={13} strokeWidth={2.2} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DocumentComplianceCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-primary-dark">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-44 dark:bg-white/10" />

        <Skeleton className="h-5 w-32 dark:bg-white/10" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-16 w-full rounded-lg dark:bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}