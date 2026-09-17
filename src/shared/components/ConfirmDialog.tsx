import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "default",
  isLoading = false,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape + clic extérieur
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, isLoading]);

  // Bloquer le scroll du body
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => !isLoading && onClose()}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl",
          "border border-slate-200 bg-white shadow-2xl",
          "dark:border-white/10 dark:bg-[#0f1435]"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Fermer"
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full",
            "text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white"
          )}
        >
          <X size={16} />
        </button>

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                variant === "danger"
                  ? "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  : "bg-accent/10 text-accent"
              )}
            >
              <AlertTriangle size={20} />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h2
                id="confirm-title"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                {title}
              </h2>
              {description && (
                <p className="mt-1.5 text-sm text-slate-500 dark:text-white/50">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={cn(
                "rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium",
                "text-slate-700 transition-colors hover:bg-slate-50",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
              )}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium text-white",
                "transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                variant === "danger"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-accent hover:bg-accent/90"
              )}
            >
              {isLoading ? "Déconnexion..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}