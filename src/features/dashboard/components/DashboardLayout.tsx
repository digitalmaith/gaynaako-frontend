// src/features/dashboard/components/DashboardLayout.tsx
import { type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Compass,
  ClipboardList,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";

const navItems = [
  { to: "/dashboard", label: "Vue d'ensemble", icon: LayoutGrid },
  { to: "/dashboard/opportunites", label: "Opportunités", icon: Compass },
  { to: "/dashboard/candidatures", label: "Candidatures", icon: ClipboardList },
  { to: "/dashboard/alertes", label: "Alertes", icon: Bell },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0A0E2E]">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-white/10 dark:bg-primary-dark lg:flex">
        <div className="flex items-center gap-2 px-6 py-6">
          <img src={logo} alt="Gaynaako" className="h-9 w-9 rounded-xl" />
          <span className="font-semibold text-primary dark:text-white">Gaynaako</span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/5 text-primary dark:bg-white/10 dark:text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-3 dark:border-white/10">
          <Link
            to="/dashboard/parametres"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80"
          >
            <Settings size={18} strokeWidth={1.8} />
            Paramètres
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-white/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu */}
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-primary-dark lg:px-10">
          <div>
            <p className="text-sm text-slate-400 dark:text-white/40">Bonjour</p>
            <p className="font-display text-lg font-semibold text-primary dark:text-white">
              {user?.prenom ?? "—"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-white/10" />
          </div>
        </header>

        <main className="px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}