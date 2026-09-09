// src/features/dashboard/components/Sidebar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Compass,
  ClipboardList,
  FileCheck2,
  Bell,
  Settings,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/auth.store";

const shortcuts = [
  { to: "/dashboard", label: "Vue d'ensemble", icon: LayoutGrid, dot: "bg-accent" },
  { to: "/dashboard/opportunites", label: "Opportunités", icon: Compass, dot: "bg-emerald-500" },
  { to: "/dashboard/candidatures", label: "Candidatures", icon: ClipboardList, dot: "bg-sky-500" },
  { to: "/dashboard/documents", label: "Documents", icon: FileCheck2, dot: "bg-amber-500" },
  { to: "/dashboard/alertes", label: "Alertes", icon: Bell, dot: "bg-rose-500" },
];

export function Sidebar() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative hidden shrink-0 border-r border-slate-200 py-6 transition-all duration-200 dark:border-white/10 lg:block ${
        collapsed ? "w-[72px] px-2" : "w-64 px-4"
      }`}
    >
      {/* Bouton toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Ouvrir la barre latérale" : "Fermer la barre latérale"}
        className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm hover:text-slate-600 dark:border-white/10 dark:bg-[#0b0f2b] dark:text-white/40 dark:hover:text-white/70"
      >
        {collapsed ? <ChevronsRight size={13} /> : <ChevronsLeft size={13} />}
      </button>

      {/* Compte */}
      <button
        className={`group relative flex w-full items-center gap-2 rounded-lg py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5 ${
          collapsed ? "justify-center px-0" : "px-2"
        }`}
      >
        <div className="h-7 w-7 shrink-0 rounded-full bg-primary/10 dark:bg-white/10" />
        {!collapsed && (
          <>
            <span className="truncate text-sm font-medium text-slate-700 dark:text-white/80">
              {user?.prenom ?? "Mon compte"}
            </span>
            <ChevronDown size={14} className="ml-auto text-slate-400 dark:text-white/40" />
          </>
        )}
        {collapsed && (
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-primary-dark">
            {user?.prenom ?? "Mon compte"}
          </span>
        )}
      </button>

      {!collapsed && (
        <div className="mt-6 flex items-center justify-between px-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-white/30">
            Mes espaces
          </p>
        </div>
      )}

      <nav className={`space-y-0.5 ${collapsed ? "mt-8" : "mt-2"}`}>
        {shortcuts.map(({ to, label, icon: Icon, dot }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`group relative flex items-center rounded-lg py-2 text-sm transition-colors ${
                collapsed ? "justify-center px-0" : "gap-2.5 px-2"
              } ${
                active
                  ? "bg-primary/5 font-medium text-primary dark:bg-white/10 dark:text-white"
                  : "text-slate-600 hover:bg-slate-50 dark:text-white/60 dark:hover:bg-white/5"
              }`}
            >
              <Icon size={16} strokeWidth={active ? 2.2 : 1.8} className="shrink-0" />
              {!collapsed && (
                <>
                  <span className="truncate">{label}</span>
                  <span className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                </>
              )}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-3 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-primary-dark">
                  {label}
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        className={`mt-6 border-t border-slate-100 pt-4 dark:border-white/10`}
      >
        <Link
          to="/dashboard/parametres"
          className={`group relative flex items-center rounded-lg py-2 text-sm text-slate-500 hover:bg-slate-50 dark:text-white/50 dark:hover:bg-white/5 ${
            collapsed ? "justify-center px-0" : "gap-2.5 px-2"
          }`}
        >
          <Settings size={16} strokeWidth={1.8} />
          {!collapsed && "Paramètres"}
          {collapsed && (
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-primary-dark">
              Paramètres
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
}