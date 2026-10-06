// src/features/assistant/components/ConversationSidebar.tsx
import { MessageSquarePlus, Trash2, MessageSquare } from "lucide-react";
import type { Conversation } from "../types";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeId?: string;
  loading: boolean;
  onSelect: (conversationId: string) => void;
  onNew: () => void;
  onDelete: (conversationId: string) => void;
}

export function ConversationSidebar({
  conversations,
  activeId,
  loading,
  onSelect,
  onNew,
  onDelete,
}: ConversationSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <button
        onClick={onNew}
        className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-white/20 dark:text-white/70 dark:hover:bg-white/5"
      >
        <MessageSquarePlus size={15} />
        Nouvelle conversation
      </button>

      <div className="mt-4 flex-1 space-y-1 overflow-y-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-lg bg-slate-100 dark:bg-white/5" />
          ))
        ) : conversations.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-slate-400 dark:text-white/30">
            Aucune conversation pour l'instant.
          </p>
        ) : (
          conversations.map((c) => (
            <div
              key={c.id}
              className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                activeId === c.id
                  ? "bg-primary/5 text-primary dark:bg-white/10 dark:text-white"
                  : "text-slate-600 hover:bg-slate-50 dark:text-white/60 dark:hover:bg-white/5"
              }`}
            >
              <button
                onClick={() => onSelect(c.id)}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
              >
                <MessageSquare size={14} className="shrink-0" />
                <span className="truncate">{c.title || "Nouvelle conversation"}</span>
              </button>
              <button
                onClick={() => onDelete(c.id)}
                aria-label="Supprimer"
                className="shrink-0 rounded p-1 text-slate-400 opacity-0 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:text-white/30 dark:hover:bg-red-500/10"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}