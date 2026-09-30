import { useEffect, useRef } from "react";
import {
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCircle2,
  X,
  type LucideIcon,
} from "lucide-react";

// ─────────────────────────────────────────────
// Utils
// ─────────────────────────────────────────────
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Variant = "default" | "danger" | "warning" | "info" | "success";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loadingLabel?: string;
  variant?: Variant;
  isLoading?: boolean;
}

interface VariantConfig {
  icon: LucideIcon;
  iconBg: string;
  confirmBtn: string;
}

// ─────────────────────────────────────────────
// Config par variante
// ─────────────────────────────────────────────
const VARIANTS: Record<Variant, VariantConfig> = {
  default: {
    icon: AlertTriangle,
    iconBg: "bg-accent/10 text-accent dark:bg-accent/15",
    confirmBtn: "bg-accent hover:bg-accent-dark",
  },
  danger: {
    icon: AlertOctagon,
    iconBg: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    confirmBtn: "bg-red-600 hover:bg-red-700",
  },
  warning: {
    icon: AlertTriangle,
    iconBg:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    confirmBtn: "bg-amber-600 hover:bg-amber-700",
  },
  info: {
    icon: Info,
    iconBg: "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    confirmBtn: "bg-primary hover:bg-primary-light",
  },
  success: {
    icon: CheckCircle2,
    iconBg:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    confirmBtn: "bg-emerald-600 hover:bg-emerald-700",
  },
};

// ─────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  loadingLabel = "Traitement...",
  variant = "default",
  isLoading = false,
}: Readonly<ConfirmDialogProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const v = VARIANTS[variant];
  const Icon = v.icon;

  // ─── Ouvre/ferme le dialog natif ───
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // ─── Escape (cancel natif) ───
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();  // empêche la fermeture native → passe par onClose
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  // ─── Clic sur le backdrop ───
  // (via addEventListener pour éviter S6847 + S1082)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInDialog) onClose();
    };

    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-title"
      aria-describedby={description ? "confirm-desc" : undefined}
      className={cn(
        "max-w-md overflow-hidden rounded-2xl p-0",
        "border border-slate-200 bg-white shadow-2xl",
        "dark:border-white/10 dark:bg-[#0f1435]",
        "backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm"
      )}
    >
      {/* Bouton fermer */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <X size={16} />
      </button>

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icône */}
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
              v.iconBg
            )}
          >
            <Icon size={20} strokeWidth={2.2} />
          </div>

          {/* Contenu */}
          <div className="min-w-0 flex-1 pt-0.5">
            <h2
              id="confirm-title"
              className="font-display text-base font-semibold text-slate-900 dark:text-white"
            >
              {title}
            </h2>
            {description && (
              <p
                id="confirm-desc"
                className="mt-1.5 text-sm text-slate-500 dark:text-white/50"
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              v.confirmBtn
            )}
          >
            {isLoading && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}