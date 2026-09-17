import { Link, useLocation } from "react-router-dom";
import { shortcuts } from "./navigation";

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] dark:border-white/10 dark:bg-[#0b0f2b] lg:hidden">
      {shortcuts.map(({ to, label, icon: Icon, dot }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] ${
              active
                ? "text-primary dark:text-white"
                : "text-slate-400 dark:text-white/40"
            }`}
          >
            <span className="relative">
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
              {active && (
                <span className={`absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full ${dot}`} />
              )}
            </span>
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}