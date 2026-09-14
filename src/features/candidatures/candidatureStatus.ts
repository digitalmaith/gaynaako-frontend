// src/features/candidatures/candidatureStatus.ts
import { FileEdit, Send, Search, CheckCircle2, XCircle, Clock, type LucideIcon } from "lucide-react";
import type { CandidatureStatut } from "./types";

export interface CandidatureStatusStyle {
  icon: LucideIcon;
  label: string;
  badge: string;
}

// ⚠️ à ajuster dès confirmation de l'enum réel
export const candidatureStatusStyles: Record<CandidatureStatut, CandidatureStatusStyle> = {
  BROUILLON: {
    icon: FileEdit,
    label: "Brouillon",
    badge: "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-white/50",
  },
  SOUMISE: {
    icon: Send,
    label: "Soumise",
    badge: "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300",
  },
  EN_COURS_EXAMEN: {
    icon: Search,
    label: "En cours d'examen",
    badge: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
  },
  ACCEPTEE: {
    icon: CheckCircle2,
    label: "Acceptée",
    badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  REJETEE: {
    icon: XCircle,
    label: "Rejetée",
    badge: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300",
  },
  EXPIREE: {
    icon: Clock,
    label: "Expirée",
    badge: "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-white/50",
  },
};

// Repli visuel si le backend renvoie un statut non prévu ci-dessus
export const fallbackStatusStyle: CandidatureStatusStyle = {
  icon: Clock,
  label: "Statut inconnu",
  badge: "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-white/50",
};

export function getStatusStyle(statut: CandidatureStatut): CandidatureStatusStyle {
  return candidatureStatusStyles[statut] ?? fallbackStatusStyle;
}