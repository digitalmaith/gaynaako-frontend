import { Search, Bell, Plus, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { getAccountDisplay } from "@/features/auth/utils/getAccountDisplay";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";

export function TopBar() {
  const user = useAuthStore((state) => state.user);
  const account = getAccountDisplay(user);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 dark:border-white/10 dark:bg-[#0b0f2b] lg:px-6">
      <div className="flex shrink-0 items-center gap-2">
        <img src={logo} alt="Gaynaako" className="h-8 w-8 rounded-lg" />
        <span className="hidden font-display font-semibold text-primary dark:text-white sm:inline">
          Gaynaako
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40"
        />
        <input
          type="text"
          placeholder="Rechercher une opportunité, un document..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />

        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 dark:text-white/60 dark:hover:bg-white/5"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        <button
          aria-label="Action rapide"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 dark:text-white/60 dark:hover:bg-white/5"
        >
          <Plus size={17} />
        </button>

        <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-slate-50 dark:hover:bg-white/5">
          {account.logoUrl ? (
            <img
              src={account.logoUrl}
              alt={account.title}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-primary/10 dark:bg-white/10" />
          )}
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-xs font-medium text-slate-700 dark:text-white/80">
              {account.title}
            </p>
            {account.subtitle && (
              <p className="text-[11px] text-slate-400 dark:text-white/40">
                {account.subtitle}
              </p>
            )}
          </div>
          <ChevronDown size={14} className="text-slate-400 dark:text-white/40" />
        </button>
      </div>
    </header>
  );
}