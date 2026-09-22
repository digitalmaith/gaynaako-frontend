import {
  LayoutGrid,
  Compass,
  ClipboardList,
  FileCheck2,
  Users,
  Briefcase,
  ScrollText,
  Shield,
  type LucideIcon,
} from "lucide-react";

export interface NavShortcut {
  to: string;
  label: string;
  icon: LucideIcon;
  dot: string;
}

// ─── Navigation USER ───
export const userShortcuts: NavShortcut[] = [
  { to: "/app/dashboard", label: "Vue d'ensemble", icon: LayoutGrid, dot: "bg-accent" },
  { to: "/app/opportunities", label: "Opportunités", icon: Compass, dot: "bg-emerald-500" },
  { to: "/app/candidatures", label: "Candidatures", icon: ClipboardList, dot: "bg-sky-500" },
  { to: "/app/documents", label: "Documents", icon: FileCheck2, dot: "bg-amber-500" },
];

// ─── Navigation ADMIN ───
export const adminShortcuts: NavShortcut[] = [
  { to: "/app/admin", label: "Vue d'ensemble", icon: Shield, dot: "bg-accent" },
  { to: "/app/admin/users", label: "Utilisateurs", icon: Users, dot: "bg-sky-500" },
  { to: "/app/admin/opportunities", label: "Opportunités", icon: Briefcase, dot: "bg-emerald-500" },
  { to: "/app/admin/logs", label: "Logs", icon: ScrollText, dot: "bg-amber-500" },
];

// ─── Section label selon le rôle ───
export const sectionLabels = {
  user: "Mes espaces",
  admin: "Administration",
} as const;