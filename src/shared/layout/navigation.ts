// src/shared/layout/navigation.ts
import { LayoutGrid, Compass, ClipboardList, FileCheck2, type LucideIcon } from "lucide-react";

export interface NavShortcut {
  to: string;
  label: string;
  icon: LucideIcon;
  dot: string;
}

export const shortcuts: NavShortcut[] = [
  { to: "/dashboard", label: "Vue d'ensemble", icon: LayoutGrid, dot: "bg-accent" },
  { to: "/opportunities", label: "Opportunités", icon: Compass, dot: "bg-emerald-500" },
  { to: "/candidatures", label: "Candidatures", icon: ClipboardList, dot: "bg-sky-500" },
  { to: "/documents", label: "Documents", icon: FileCheck2, dot: "bg-amber-500" },
];