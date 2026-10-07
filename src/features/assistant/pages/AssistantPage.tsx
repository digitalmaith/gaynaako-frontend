// src/features/assistant/pages/AssistantPage.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ArrowLeft, // ⬅️ nouveau
} from "lucide-react";
import { assistantService } from "../services/assistant.service";
import { ConversationList } from "../components/ConversationList";
import { AssistantChatBox } from "../components/AssistantChatBox";
import { BrandLogo } from "../components/BrandLogo";
import { useAvailableHeight } from "@/shared/hooks/useAvailableHeight";
import { useAuthStore } from "@/app/store/authStore";
import { getAccountDisplay } from "@/features/auth/utils/getAccountDisplay";
import { getInitials } from "@/features/auth/utils/getInitials";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";
import type { Conversation } from "../types";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface LocationState {
  initialMessage?: string;
}

export default function AssistantPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const availableHeight = useAvailableHeight(containerRef);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const account = getAccountDisplay(user);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | undefined>();
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const state = location.state as LocationState | null;
  const [initialMessage] = useState<string | undefined>(state?.initialMessage);

  useEffect(() => {
    if (state?.initialMessage) {
      navigate(".", { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadConversations = useCallback(async () => {
    try {
      const list = await assistantService.listConversations();
      setConversations(list);
      setError(null);
    } catch {
      setError("Impossible de charger les conversations.");
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadConversations();
    });
  }, [loadConversations]);

  const handleDeleted = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setActiveId((prev) => (prev === id ? undefined : prev));
  };

  const handleConversationStart = (id: string) => {
    setActiveId(id);
    void loadConversations();
  };

  /* ---------- Navigation retour ---------- */
  const handleBack = () => {
    // Si un historique existe, on revient en arrière,
    // sinon fallback explicite vers le dashboard.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/app/dashboard");
    }
  };

  return (
    <div
      ref={containerRef}
      className="
        relative flex overflow-hidden p-3 sm:p-4
        bg-gradient-to-br from-sand via-[#FDF6F0] to-[#F5EDE4]
        dark:from-[#070B24] dark:via-[#0A0E2E] dark:to-[#12194A]
      "
      style={{ height: availableHeight ?? "100vh" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,106,27,0.10),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(242,106,27,0.14),transparent_55%)]" />

      {/* Carte flottante */}
      <div
        className="
          relative flex min-w-0 flex-1 overflow-hidden
          rounded-3xl border border-white/60 bg-white/70 backdrop-blur-2xl
          shadow-[0_20px_60px_-20px_rgba(18,25,74,0.18)]
          dark:border-white/[0.06] dark:bg-white/[0.03]
          dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]
        "
      >
        {/* ============== SIDEBAR GAUCHE ============== */}
        <aside
          className={cn(
            "relative flex shrink-0 flex-col overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "border-r border-slate-200/60 bg-white/50 dark:border-white/[0.06] dark:bg-white/[0.02]",
            sidebarOpen ? "w-64" : "w-16"
          )}
        >
          {/* Logo Gaynaako */}
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <BrandLogo size="md" />
              {sidebarOpen && (
                <span className="font-display text-sm font-bold tracking-tight text-slate-800 dark:text-white">
                  Gaynaako
                </span>
              )}
            </div>

            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5 dark:hover:text-white/70"
              >
                <PanelLeftClose size={15} />
              </button>
            )}
          </div>

          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5 dark:hover:text-white/70"
            >
              <PanelLeftOpen size={15} />
            </button>
          )}

          {/* Bouton retour dashboard (sidebar) */}
          <div className="px-3">
            <button
              onClick={handleBack}
              title="Retour au dashboard"
              className={cn(
                "group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5",
                "text-slate-500 transition-all duration-200",
                "hover:bg-slate-100 hover:text-slate-700",
                "dark:text-white/50 dark:hover:bg-white/[0.06] dark:hover:text-white/90",
                !sidebarOpen && "justify-center px-0"
              )}
            >
              <ArrowLeft
                size={16}
                strokeWidth={2.2}
                className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              {sidebarOpen && (
                <span className="text-[13px] font-medium">Retour</span>
              )}
            </button>
          </div>

          {/* Actions */}
          <div className="mt-1 space-y-1 px-3">
            <button
              onClick={() => setActiveId(undefined)}
              className={cn(
                "group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5",
                "bg-primary/5 text-slate-700 transition-all duration-200",
                "hover:bg-primary/10 dark:bg-white/[0.04] dark:text-white/80 dark:hover:bg-white/[0.08]",
                !sidebarOpen && "justify-center px-0"
              )}
              title="Nouvelle conversation"
            >
              <Plus size={16} strokeWidth={2.2} className="shrink-0" />
              {sidebarOpen && (
                <span className="text-[13px] font-medium">Nouvelle conversation</span>
              )}
            </button>
          </div>

          {/* Historique */}
          {sidebarOpen && (
            <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-3">
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-white/40">
                  Historique
                </p>
              </div>

              {error && (
                <div className="mx-1 mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                  {error}
                </div>
              )}

              <ConversationList
                conversations={conversations}
                activeId={activeId}
                onSelect={setActiveId}
                onDeleted={handleDeleted}
                loading={loadingList}
              />
            </div>
          )}

          {/* Profil en bas */}
          <div className="border-t border-slate-200/60 p-3 dark:border-white/[0.06]">
            <button
              onClick={() => navigate("/app/profile")}
              className={cn(
                "flex w-full items-center gap-2 rounded-xl p-1.5 transition-colors",
                "hover:bg-slate-100 dark:hover:bg-white/5",
                !sidebarOpen && "justify-center"
              )}
            >
              {account.logoUrl ? (
                <img
                  src={account.logoUrl}
                  alt={account.title}
                  className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-white/10"
                />
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                  {getInitials(user?.prenom, user?.nom, account.title)}
                </div>
              )}
              {sidebarOpen && (
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-xs font-medium text-slate-700 dark:text-white/80">
                    {account.title}
                  </p>
                </div>
              )}
              {sidebarOpen && (
                <ChevronDown
                  size={14}
                  className="shrink-0 text-slate-400 dark:text-white/40"
                />
              )}
            </button>
          </div>
        </aside>

        {/* ============== ZONE PRINCIPALE ============== */}
        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Header avec bouton retour + logo Gaynaako */}
          <header className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/50 px-5 py-3 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              {/* Bouton retour (header) */}
              <button
                onClick={handleBack}
                title="Retour au dashboard"
                aria-label="Retour"
                className="
                  group mr-1 flex h-8 w-8 items-center justify-center rounded-lg
                  text-slate-500 transition-all duration-200
                  hover:bg-slate-100 hover:text-slate-700
                  dark:text-white/50 dark:hover:bg-white/[0.06] dark:hover:text-white/90
                "
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={2.2}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />
              </button>

              <BrandLogo size="sm" />
              <span className="text-[13px] font-medium text-slate-700 dark:text-white/80">
                Gaynaako
              </span>
              <ChevronDown size={13} className="text-slate-400 dark:text-white/40" />
            </div>

            <div className="flex items-center gap-1">
              <ThemeToggle />
            </div>
          </header>

          <div className="relative z-10 min-h-0 flex-1">
            <AssistantChatBox
              key={activeId ?? "new"}
              conversationId={activeId}
              initialMessage={activeId ? undefined : initialMessage}
              onConversationStart={handleConversationStart}
            />
          </div>
        </main>
      </div>
    </div>
  );
}