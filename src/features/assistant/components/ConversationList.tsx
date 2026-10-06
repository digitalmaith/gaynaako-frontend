// src/features/assistant/components/ConversationList.tsx
import { useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { assistantService } from "../services/assistant.service";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import type { Conversation } from "../types";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onDeleted?: (id: string) => void;
  loading?: boolean;
}

function getErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null) {
    const obj = err as Record<string, unknown>;
    if (obj.response && typeof obj.response === "object") {
      const r = obj.response as Record<string, unknown>;
      if (r.data && typeof r.data === "object") {
        const d = r.data as Record<string, unknown>;
        if (typeof d.error === "string") return d.error;
        if (typeof d.message === "string") return d.message;
      }
    }
    if (typeof obj.error === "string") return obj.error;
    if (typeof obj.message === "string") return obj.message;
  }
  return fallback;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  onDeleted,
  loading = false,
}: Readonly<ConversationListProps>) {
  const [toDelete, setToDelete] = useState<Conversation | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (deleting) return;
    setToDelete(null);
    setError(null);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    setError(null);
    try {
      await assistantService.deleteConversation(toDelete.id);
      onDeleted?.(toDelete.id);
      setToDelete(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "(erreur)";
      console.error(`[ConversationList] Erreur: ${msg}`);
      setError(getErrorMessage(err, "Erreur lors de la suppression."));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 animate-pulse rounded-lg bg-slate-100 dark:bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="px-3 py-6 text-center">
        <p className="text-xs text-slate-400 dark:text-white/40">
          Aucune conversation
        </p>
        <p className="mt-1 text-[11px] text-slate-300 dark:text-white/30">
          Posez une question pour commencer
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-0.5">
        {conversations.map((c) => {
          const isActive = c.id === activeId;
          return (
            <li key={c.id} className="group relative">
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                title={c.title}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 pr-10 text-left transition-colors ${
                  isActive
                    ? "bg-slate-100 dark:bg-white/10"
                    : "hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <MessageSquare
                  size={14}
                  className={`shrink-0 ${
                    isActive
                      ? "text-[#1E2B7A] dark:text-white"
                      : "text-slate-400 dark:text-white/40"
                  }`}
                />
                <span
                  className={`truncate text-[13px] ${
                    isActive
                      ? "font-semibold text-slate-800 dark:text-white"
                      : "text-slate-600 dark:text-white/70"
                  }`}
                >
                  {c.title}
                </span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setError(null);
                  setToDelete(c);
                }}
                title="Supprimer"
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 ${
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <Trash2 size={13} />
              </button>
            </li>
          );
        })}
      </ul>

      {toDelete && (
        <ConfirmDialog
          open={true}
          onClose={handleClose}
          onConfirm={handleDelete}
          title="Supprimer la conversation ?"
          description={
            error ??
            `La conversation « ${toDelete.title} » et tous ses messages seront définitivement supprimés. Cette action est irréversible.`
          }
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
          loadingLabel="Suppression..."
          variant="danger"
          isLoading={deleting}
        />
      )}
    </>
  );
}