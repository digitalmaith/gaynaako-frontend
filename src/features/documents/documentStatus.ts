// src/features/documents/documentStatus.ts
import { CheckCircle2, Clock, type LucideIcon } from "lucide-react";
import type { DocumentViewStatus } from "./types";

export interface DocumentStatusStyle {
  icon: LucideIcon;
  label: string;
  text: string;
  badge: string;
}

export const documentStatusStyles: Record<DocumentViewStatus, DocumentStatusStyle> = {
  fourni: {
    icon: CheckCircle2,
    label: "Fourni",
    text: "text-emerald-800 dark:text-emerald-300",
    badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  non_fourni: {
    icon: Clock,
    label: "Non fourni",
    text: "text-slate-600 dark:text-white/70",
    badge: "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-white/50",
  },
};