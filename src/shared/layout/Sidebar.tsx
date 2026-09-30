import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { Tooltip } from "@/shared/components/Tooltip";
import { getAccountDisplay } from "@/features/auth/utils/getAccountDisplay";
import type { NavShortcut, NavSection } from "@/shared/layout/navigation";

interface SidebarProps {
  readonly collapsed: boolean;
  readonly onToggleCollapsed: () => void;
  readonly sections: NavSection[];
  readonly settingsLink?: string;
  readonly onLogout?: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  sections,
  settingsLink = "/app/profile",
  onLogout,
}: SidebarProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const account = getAccountDisplay(user);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div
      className={`fixed bottom-0 top-16 hidden shrink-0 transition-all duration-200 lg:block ${
        collapsed ? "w-18" : "w-64"
      }`}
    >
      {/* Toggle collapse */}
      <button
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Ouvrir la barre latérale" : "Fermer la barre latérale"}
        className="absolute -right-3 top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-[#0b0f2b] dark:text-white/40 dark:hover:text-white"
      >
        {collapsed ? <ChevronsRight size={13} /> : <ChevronsLeft size={13} />}
      </button>

      <aside
        className={`flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white py-6 dark:border-white/10 dark:bg-[#0b0f2b] ${
          collapsed ? "px-2" : "px-3"
        }`}
      >
        {/* ═══════════ COMPTE ═══════════ */}
        <div className="relative">
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
              onClick={() => !collapsed && setAccountOpen((o) => !o)}
              className={`group flex w-full items-center gap-2.5 rounded-xl border border-transparent p-2 text-left transition-all hover:border-slate-200 hover:bg-slate-50 dark:hover:border-white/10 dark:hover:bg-white/5 ${
                collapsed ? "justify-center" : ""
              }`}
            >
              {/* Avatar avec gradient */}
              {account.logoUrl ? (
                <img
                  src={account.logoUrl}
                  alt={account.title}
                  className="h-9 w-9 shrink-0 rounded-xl object-cover ring-2 ring-white dark:ring-[#0b0f2b]"
                />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent text-sm font-bold text-white ring-2 ring-white dark:ring-[#0b0f2b]">
                  {account.title?.charAt(0).toUpperCase() ?? "?"}
                </div>
              )}

              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {account.title}
                    </p>
                    {account.subtitle && (
                      <p className="truncate text-xs text-slate-400 dark:text-white/40">
                        {account.subtitle}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-slate-400 transition-transform dark:text-white/40 ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>
          </Tooltip>

          {/* Menu déroulant compte */}
          {accountOpen && !collapsed && (
            <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-[#0b0f2b]">
              <Link
                to={settingsLink}
                onClick={() => setAccountOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:text-white/80 dark:hover:bg-white/5"
              >
                <Settings size={14} />
                Mon compte
              </Link>
              {onLogout && (
                <button
                  onClick={() => {
                    setAccountOpen(false);
                    onLogout();
                  }}
                  className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50 dark:border-white/10 dark:text-rose-400 dark:hover:bg-rose-500/10"
                >
                  <LogOut size={14} />
                  Se déconnecter
                </button>
              )}
            </div>
          )}
        </div>

        {/* ═══════════ SECTIONS DE NAVIGATION ═══════════ */}
        <nav className={`flex-1 ${collapsed ? "mt-6 space-y-4" : "mt-6 space-y-5"}`}>
          {sections.map((section) => (
            <div key={section.label}>
              {/* Label de section */}
              {!collapsed && (
                <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30">
                  {section.label}
                </p>
              )}
              {collapsed && (
                <div className="mx-auto mb-2 h-px w-6 bg-slate-200 dark:bg-white/10" />
              )}

              {/* Items */}
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <SidebarItem
                    key={item.to}
                    item={item}
                    collapsed={collapsed}
                    active={location.pathname === item.to}
                  />
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ═══════════ FOOTER ═══════════ */}
        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-white/10">
          <Tooltip label="Paramètres" disabled={!collapsed}>
            <Link
              to={settingsLink}
              className={`group flex items-center rounded-lg py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80 ${
                collapsed ? "justify-center px-0" : "gap-2.5 px-2"
              }`}
            >
              <Settings size={16} strokeWidth={1.8} className="shrink-0" />
              {!collapsed && "Paramètres"}
            </Link>
          </Tooltip>
        </div>
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────
// Item de navigation
// ─────────────────────────────────────────────
function SidebarItem({
  item,
  collapsed,
  active,
}: {
  readonly item: NavShortcut;
  readonly collapsed: boolean;
 readonly  active: boolean;
}) {
  const { to, label, icon: Icon, dot } = item;

  return (
    <li className="relative">
      <Tooltip
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
          className={`group relative flex items-center rounded-lg py-2 text-sm transition-all ${
            collapsed ? "justify-center px-0" : "gap-2.5 px-2.5"
          } ${
            active
              ? "bg-primary/5 font-semibold text-primary dark:bg-white/10 dark:text-white"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white/90"
          }`}
        >
          {/* Barre latérale active (orange) */}
          {active && (
            <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
          )}

          {/* Icône */}
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${
              active
                ? "bg-primary text-white dark:bg-accent"
                : "bg-transparent group-hover:bg-slate-100 dark:group-hover:bg-white/5"
            }`}
          >
            <Icon size={15} strokeWidth={active ? 2.4 : 1.9} />
          </div>

          {!collapsed && (
            <>
              <span className="truncate">{label}</span>
              <span
                className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full transition-opacity ${dot} ${
                  active ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                }`}
              />
            </>
          )}
        </Link>
      </Tooltip>
    </li>
  );
}