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

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

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

  /* ---------------- Loading skeleton ---------------- */
  if (loading) {
    return (
      <div className="space-y-1.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-11 animate-pulse rounded-xl bg-slate-100/80 dark:bg-white/[0.04]"
          />
        ))}
      </div>
    );
  }

  /* ---------------- Empty state ---------------- */
  if (conversations.length === 0) {
    return (
      <div className="mx-1 rounded-2xl border border-dashed border-slate-200/70 bg-white/40 px-4 py-8 text-center dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/[0.06]">
          <MessageSquare size={16} className="text-slate-400 dark:text-white/40" />
        </div>
        <p className="text-xs font-medium text-slate-500 dark:text-white/60">
          Aucune conversation
        </p>
        <p className="mt-1 text-[11px] text-slate-400 dark:text-white/30">
          Posez une question pour commencer
        </p>
      </div>
    );
  }

  /* ---------------- Liste ---------------- */
  return (
    <>
      <ul className="space-y-1">
        {conversations.map((c) => {
          const isActive = c.id === activeId;

          return (
            <li key={c.id} className="group/item relative">
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                title={c.title}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 pr-10 text-left",
                  "transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary/[0.08] to-accent/[0.06] shadow-[0_2px_8px_-4px_rgba(18,25,74,0.15)] dark:from-white/[0.08] dark:to-accent/[0.08]"
                    : "hover:bg-slate-100/70 dark:hover:bg-white/[0.04]"
                )}
              >
                {/* Icône dans un conteneur rond */}
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                    isActive
                      ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_2px_8px_-2px_rgba(18,25,74,0.4)] dark:from-accent dark:to-accent-light dark:shadow-[0_2px_8px_-2px_rgba(242,106,27,0.5)]"
                      : "bg-slate-100 text-slate-400 group-hover/item:bg-slate-200/70 group-hover/item:text-slate-500 dark:bg-white/[0.05] dark:text-white/40 dark:group-hover/item:bg-white/[0.08] dark:group-hover/item:text-white/60"
                  )}
                >
                  <MessageSquare size={13} strokeWidth={2.2} />
                </span>

                {/* Titre */}
                <span
                  className={cn(
                    "truncate text-[13px] leading-snug transition-colors",
                    isActive
                      ? "font-semibold text-slate-800 dark:text-white"
                      : "font-medium text-slate-600 dark:text-white/70"
                  )}
                >
                  {c.title}
                </span>
              </button>

              {/* Bouton supprimer */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setError(null);
                  setToDelete(c);
                }}
                title="Supprimer"
                className={cn(
                  "absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg",
                  "text-slate-400 transition-all duration-200",
                  "hover:bg-red-50 hover:text-red-500",
                  "dark:text-white/40 dark:hover:bg-red-500/15 dark:hover:text-red-400",
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover/item:opacity-100"
                )}
              >
                <Trash2 size={13} strokeWidth={2.2} />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Dialog de confirmation */}
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