// src/features/assistant/pages/AssistantPage.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, PanelRightClose } from "lucide-react";
import { assistantService } from "../services/assistant.service";
import { ConversationList } from "../components/ConversationList";
import { AssistantChatBox } from "../components/AssistantChatBox";
import { useAvailableHeight } from "@/shared/hooks/useAvailableHeight";
import type { Conversation } from "../types";

interface LocationState {
  initialMessage?: string;
}

export default function AssistantPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const availableHeight = useAvailableHeight(containerRef);
  const location = useLocation();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | undefined>();
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const state = location.state as LocationState | null;
  const [initialMessage] = useState<string | undefined>(state?.initialMessage);

  useEffect(() => {
    // Nettoie le state de navigation pour qu'un refresh/retour n'auto-renvoie pas le message
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

  const handleDeleted = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeId === id) setActiveId(undefined);
    },
    [activeId]
  );

  const handleConversationStart = useCallback(
    (id: string) => {
      setActiveId(id);
      void loadConversations();
    },
    [loadConversations]
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-white dark:bg-[#0A0E2E]"
      style={{ height: availableHeight ?? "100vh" }}
    >
      <div className="h-full">
        <AssistantChatBox
          key={activeId ?? "new"}
          conversationId={activeId}
          initialMessage={activeId ? undefined : initialMessage}
          onConversationStart={handleConversationStart}
          onNewConversation={() => setActiveId(undefined)}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          sidebarOpen={sidebarOpen}
        />
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 z-20 bg-black/20 lg:hidden"
        />
      )}

      <aside
        className={`absolute right-0 top-0 z-30 grid h-full w-72 grid-rows-[auto_1fr] border-l border-slate-200 bg-white shadow-xl transition-transform duration-200 ease-out dark:border-white/10 dark:bg-[#0A0E2E] ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-white/10">
          <div>
            <p className="font-display text-sm font-semibold text-slate-800 dark:text-white">
              Conversations
            </p>
            <p className="mt-0.5 text-xs text-slate-400 dark:text-white/40">
              {conversations.length} conversation{conversations.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveId(undefined)}
              title="Nouvelle conversation"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white transition-colors hover:bg-accent-light"
            >
              <Plus size={16} />
            </button>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              title="Fermer les conversations"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/80"
            >
              <PanelRightClose size={16} />
            </button>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto px-2 py-3">
          {error && (
            <div className="mx-1 mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
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
      </aside>
    </div>
  );
}