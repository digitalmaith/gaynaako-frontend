import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";
import { Tooltip } from "@/shared/components/Tooltip";
import { getAccountDisplay } from "@/features/auth/utils/getAccountDisplay";
import type { NavShortcut } from "@/shared/layout/navigation";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  shortcuts: NavShortcut[];
  sectionLabel: string;
  settingsLink?: string;
}

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  shortcuts,
  sectionLabel,
  settingsLink = "/app/profile",
}: SidebarProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const account = getAccountDisplay(user);

  return (
    <div
      className={`fixed bottom-0 top-16 hidden shrink-0 transition-all duration-200 lg:block ${
        collapsed ? "w-18" : "w-64"
      }`}
    >
      <button
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Ouvrir la barre latérale" : "Fermer la barre latérale"}
        className="absolute -right-3 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm hover:text-slate-600 dark:border-white/10 dark:bg-[#0b0f2b] dark:text-white/40 dark:hover:text-white/70"
      >
        {collapsed ? <ChevronsRight size={13} /> : <ChevronsLeft size={13} />}
      </button>

      <aside
        className={`h-full overflow-y-auto border-r border-slate-200 py-6 dark:border-white/10 ${
          collapsed ? "px-2" : "px-4"
        }`}
      >
        {/* Compte */}
        <Tooltip
          label={
            <span>
              {account.title}
              {account.subtitle && (
                <span className="ml-1 opacity-60">· {account.subtitle}</span>
              )}
            </span>
          }
          disabled={!collapsed}
        >
          <button
            className={`flex w-full items-center gap-2 rounded-lg py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5 ${
              collapsed ? "justify-center px-0" : "px-2"
            }`}
          >
            {account.logoUrl ? (
              <img
                src={account.logoUrl}
                alt={account.title}
                className="h-7 w-7 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="h-7 w-7 shrink-0 rounded-full bg-primary/10 dark:bg-white/10" />
            )}
            {!collapsed && (
              <>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-white/80">
                    {account.title}
                  </p>
                  {account.subtitle && (
                    <p className="truncate text-xs text-slate-400 dark:text-white/40">
                      {account.subtitle}
                    </p>
                  )}
                </div>
                <ChevronDown size={14} className="ml-auto shrink-0 text-slate-400 dark:text-white/40" />
              </>
            )}
          </button>
        </Tooltip>

        {!collapsed && (
          <div className="mt-6 flex items-center justify-between px-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-white/30">
              {sectionLabel}
            </p>
          </div>
        )}

        <nav className={`space-y-0.5 ${collapsed ? "mt-8" : "mt-2"}`}>
          {shortcuts.map(({ to, label, icon: Icon, dot }) => {
            const active = location.pathname === to;
            return (
              <Tooltip
                key={to}
                disabled={!collapsed}
                label={
                  <span className="flex items-center gap-1.5">
                    {label}
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                  </span>
                }
              >
                <Link
                  to={to}
                  className={`flex items-center rounded-lg py-2 text-sm transition-colors ${
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
                </Link>
              </Tooltip>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/10">
          <Tooltip label="Paramètres" disabled={!collapsed}>
            <Link
              to={settingsLink}
              className={`flex items-center rounded-lg py-2 text-sm text-slate-500 hover:bg-slate-50 dark:text-white/50 dark:hover:bg-white/5 ${
                collapsed ? "justify-center px-0" : "gap-2.5 px-2"
              }`}
            >
              <Settings size={16} strokeWidth={1.8} />
              {!collapsed && "Paramètres"}
            </Link>
          </Tooltip>
        </div>
      </aside>
    </div>
  );
}