import {
  LayoutGrid,
  Compass,
  ClipboardList,
  FileCheck2,
  Shield,
  Users,
  Briefcase,
  ScrollText,
  Building2,
  Cpu,
  Bot,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";

export interface NavShortcut {
  to: string;
  label: string;
  icon: LucideIcon;
  dot: string;
}

export interface NavSection {
  label: string;
  items: NavShortcut[];
}

// ─────────────────────────────────────────────
// Navigation USER
// ─────────────────────────────────────────────
export const userSections: NavSection[] = [
  {
    label: "Mes espaces",
    items: [
      { to: "/app/dashboard", label: "Vue d'ensemble", icon: LayoutGrid, dot: "bg-accent" },
      { to: "/app/opportunities", label: "Opportunités", icon: Compass, dot: "bg-emerald-500" },
      { to: "/app/candidatures", label: "Candidatures", icon: ClipboardList, dot: "bg-sky-500" },
      { to: "/app/documents", label: "Documents", icon: FileCheck2, dot: "bg-amber-500" },
    ],
  },
];

// ─────────────────────────────────────────────
// Navigation ADMIN
// ─────────────────────────────────────────────
export const adminSections: NavSection[] = [
  {
    label: "Administration",
    items: [
      { to: "/app/admin", label: "Vue d'ensemble", icon: Shield, dot: "bg-accent" },
      { to: "/app/admin/users", label: "Utilisateurs", icon: Users, dot: "bg-sky-500" },
      { to: "/app/admin/opportunities", label: "Opportunités", icon: Briefcase, dot: "bg-emerald-500" },
      { to: "/app/admin/emetteurs", label: "Émetteurs", icon: Building2, dot: "bg-violet-500" },
    ],
  },
  {
    label: "Système",
    items: [
      { to: "/app/admin/moteurs", label: "Moteurs", icon: Cpu, dot: "bg-rose-500" },
      { to: "/app/admin/assistant", label: "Assistant IA", icon: Bot, dot: "bg-fuchsia-500" },
      { to: "/app/admin/documentHub", label: "Document Hub", icon: FolderOpen, dot: "bg-teal-500" },
      { to: "/app/admin/logs", label: "Logs", icon: ScrollText, dot: "bg-amber-500" },
    ],
  },
];

// ─────────────────────────────────────────────
// Compat : helpers pour récupérer les shortcuts aplatis
// ─────────────────────────────────────────────
export const userShortcuts = userSections.flatMap((s) => s.items);
export const adminShortcuts = adminSections.flatMap((s) => s.items);

export const sectionLabels = {
  user: "Mes espaces",
  admin: "Administration",
} as const;