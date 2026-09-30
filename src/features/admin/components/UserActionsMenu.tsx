// src/features/admin/components/UserActionsMenu.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MoreVertical,
  Eye,
  Mail,
  Trash2,
  RotateCcw,
  Check,
} from "lucide-react";
import type { AdminUser, UserStatut } from "../api/users.api";

const STATUTS: UserStatut[] = ["ACTIF", "EN_ATTENTE", "SUSPENDU", "INACTIF"];

const STATUT_LABELS: Record<UserStatut, string> = {
  ACTIF: "Actif",
  EN_ATTENTE: "En attente",
  SUSPENDU: "Suspendu",
  INACTIF: "Inactif",
};

const STATUT_DOTS: Record<UserStatut, string> = {
  ACTIF: "bg-emerald-500",
  EN_ATTENTE: "bg-amber-500",
  SUSPENDU: "bg-rose-500",
  INACTIF: "bg-slate-400",
};

interface UserActionsMenuProps {
  readonly user: AdminUser;
  readonly onView: () => void;
  readonly onDelete: () => void;
  readonly onRestore: () => void;
  readonly onStatut: (statut: UserStatut) => void;
}

export function UserActionsMenu({
  user,
  onView,
  onDelete,
  onRestore,
  onStatut,
}: UserActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDeleted = !!user.supprimeLe;

  const handleOpen = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 220;
    const menuHeight = 320;

    let top = rect.bottom + 4;
    let left = rect.right - menuWidth;

    if (top + menuHeight > window.innerHeight) {
      top = rect.top - menuHeight - 4;
    }
    if (left < 8) left = 8;

    setPosition({ top, left });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
        aria-label="Actions"
      >
        <MoreVertical size={14} />
      </button>

      {open &&
        createPortal(
          <>
            <button
                type="button"
                aria-label="Fermer le menu"
                onClick={close}
                tabIndex={-1}
                className="fixed inset-0 z-60 cursor-default border-0 bg-transparent p-0"
                />

            <div
              className="fixed z-61 w-55 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-[#0f1435]"
              style={{ top: position.top, left: position.left }}
            >
              <button
                onClick={() => {
                  close();
                  onView();
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-white/80 dark:hover:bg-white/5"
              >
                <Eye size={14} />
                Voir le détail
              </button>

              <a
                href={`mailto:${user.email}`}
                onClick={close}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-white/80 dark:hover:bg-white/5"
              >
                <Mail size={14} />
                Envoyer un email
              </a>

              {!isDeleted && (
                <div className="border-t border-slate-100 py-1 dark:border-white/10">
                  <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                    Changer le statut
                  </p>
                  {STATUTS.map((s) => (
                    <button
                      key={s}
                      disabled={user.statut === s}
                      onClick={() => {
                        close();
                        onStatut(s);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40 dark:text-white/70 dark:hover:bg-white/5"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${STATUT_DOTS[s]}`}
                      />
                      {STATUT_LABELS[s]}
                      {user.statut === s && (
                        <Check size={11} className="ml-auto text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="border-t border-slate-100 dark:border-white/10">
                {isDeleted ? (
                  <button
                    onClick={() => {
                      close();
                      onRestore();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                  >
                    <RotateCcw size={14} />
                    Restaurer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      close();
                      onDelete();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                  >
                    <Trash2 size={14} />
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}