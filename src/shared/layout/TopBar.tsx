import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  FileText,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useAuthStore } from "@/app/store/authStore";
import { getAccountDisplay } from "@/features/auth/utils/getAccountDisplay";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// Hook : ferme au clic extérieur + Escape
function useClickOutside<T extends HTMLElement>(
  onClose: () => void,
  active: boolean
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!active) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose, active]);
  return ref;
}

export function TopBar() {
  const user = useAuthStore((state) => state.user);
  const account = getAccountDisplay(user);

  // 👇 Le menu s'ouvre depuis l'avatar du USER (à droite)
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useClickOutside<HTMLDivElement>(
    () => setUserMenuOpen(false),
    userMenuOpen
  );

  const menuItems = [
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: Sparkles, label: "Assistant IA", href: "/assistant" },
  ];

  const secondaryItems = [
    { icon: User, label: "Mon profil", href: "/profile" },
    { icon: Settings, label: "Paramètres", href: "/settings" },
    { icon: HelpCircle, label: "Aide & support", href: "/help" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-lg dark:border-white/10 dark:bg-[#0b0f2b]/80 lg:px-6">
      {/* Logo projet (juste un lien, pas de menu) */}
      <a
        href="/dashboard"
        className="flex shrink-0 items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
      >
        <img
          src={logo}
          alt="Gaynaako"
          className="h-8 w-8 rounded-lg"
        />
        <span className="hidden font-display font-semibold text-primary dark:text-white sm:inline">
          Gaynaako
        </span>
      </a>

      {/* Barre de recherche */}
      <div className="relative mx-auto w-full max-w-xl">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40"
        />
        <input
          type="text"
          placeholder="Rechercher une opportunité, un document..."
          className={cn(
            "w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm",
            "text-slate-700 outline-none placeholder:text-slate-400",
            "transition-all focus:border-accent/50 focus:bg-white focus:ring-2 focus:ring-accent/20",
            "dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30",
            "dark:focus:bg-white/10"
          )}
        />
      </div>

      {/* Actions à droite */}
      <div className="flex shrink-0 items-center gap-1.5">
        <ThemeToggle />

        <button
          type="button"
          aria-label="Notifications"
          className={cn(
            "relative flex h-9 w-9 items-center justify-center rounded-full",
            "text-slate-500 transition-colors hover:bg-slate-100",
            "dark:text-white/60 dark:hover:bg-white/5"
          )}
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-white dark:ring-[#0b0f2b]" />
        </button>

        <button
          type="button"
          aria-label="Action rapide"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            "text-slate-500 transition-colors hover:bg-slate-100",
            "dark:text-white/60 dark:hover:bg-white/5"
          )}
        >
          <Plus size={17} />
        </button>

        {/* 👇 Menu user : avatar + dropdown */}
        <div ref={userMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
            className={cn(
              "flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors",
              "hover:bg-slate-100 dark:hover:bg-white/5",
              userMenuOpen && "bg-slate-100 dark:bg-white/5"
            )}
          >
            {account.logoUrl ? (
              <img
                src={account.logoUrl}
                alt={account.title}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-white/10"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                {account.title?.[0]?.toUpperCase() ?? "U"}
              </div>
            )}
            <ChevronDown
              size={14}
              className={cn(
                "text-slate-400 transition-transform duration-200 dark:text-white/40",
                userMenuOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown ancré à droite */}
          {userMenuOpen && (
            <div
              role="menu"
              className={cn(
                "absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl",
                "border border-slate-200 bg-white shadow-xl shadow-slate-900/5",
                "dark:border-white/10 dark:bg-[#0f1435] dark:shadow-black/40"
              )}
            >
              {/* En-tête compte */}
              <div className="border-b border-slate-100 px-3 py-3 dark:border-white/5">
                <div className="flex items-center gap-3">
                  {account.logoUrl ? (
                    <img
                      src={account.logoUrl}
                      alt={account.title}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-accent/20"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                      {account.title?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
                      {account.title}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-white/40">
                      {user?.email ?? "Compte Gaynaako"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation principale */}
              <div className="p-1.5">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                      "text-slate-700 transition-colors dark:text-white/70",
                      "hover:bg-slate-100 hover:text-slate-900",
                      "dark:hover:bg-white/5 dark:hover:text-white"
                    )}
                  >
                    <item.icon size={16} className="text-slate-400 dark:text-white/40" />
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mx-1.5 border-t border-slate-100 dark:border-white/5" />

              {/* Navigation secondaire */}
              <div className="p-1.5">
                {secondaryItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                      "text-slate-700 transition-colors dark:text-white/70",
                      "hover:bg-slate-100 hover:text-slate-900",
                      "dark:hover:bg-white/5 dark:hover:text-white"
                    )}
                  >
                    <item.icon size={16} className="text-slate-400 dark:text-white/40" />
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mx-1.5 border-t border-slate-100 dark:border-white/5" />

              {/* Déconnexion */}
              <div className="p-1.5">
                <button
                  type="button"
                  role="menuitem"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm",
                    "text-red-600 transition-colors dark:text-red-400",
                    "hover:bg-red-50 dark:hover:bg-red-500/10"
                  )}
                >
                  <LogOut size={16} />
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}