import { CheckCircle2, XCircle, AlertTriangle, Clock, type LucideIcon } from "lucide-react";

export type DocumentStatus = "valide" | "expire" | "avertissement" | "non_fourni";

export interface DocumentStatusStyle {
  icon: LucideIcon;
  label: string;
  card: string;
  text: string;
  detail: string;
  badge: string;
}

export const documentStatusStyles: Record<DocumentStatus, DocumentStatusStyle> = {
  valide: {
    icon: CheckCircle2,
    label: "Valide",
    card: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10",
    text: "text-emerald-800 dark:text-emerald-300",
    detail: "text-emerald-600/70 dark:text-emerald-300/50",
    badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  expire: {
    icon: XCircle,
    label: "Expiré",
    card: "border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10",
    text: "text-red-800 dark:text-red-300",
    detail: "text-red-600/70 dark:text-red-300/50",
    badge: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300",
  },
  avertissement: {
    icon: AlertTriangle,
    label: "À vérifier",
    card: "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10",
    text: "text-amber-800 dark:text-amber-300",
    detail: "text-amber-600/70 dark:text-amber-300/50",
    badge: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
  },
  non_fourni: {
    icon: Clock,
    label: "Non fourni",
    card: "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5",
    text: "text-slate-600 dark:text-white/70",
    detail: "text-slate-400 dark:text-white/40",
    badge: "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-white/50",
  },
};