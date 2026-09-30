import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import type { ToastVariant } from "./ToastContext";

interface ToastItemProps {
  message: string;
  variant: ToastVariant;
  onClose: () => void;
}

const VARIANTS: Record<
  ToastVariant,
  { bg: string; text: string; icon: React.ElementType }
> = {
  success: {
    bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20",
    text: "text-emerald-700 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  error: {
    bg: "bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20",
    text: "text-rose-700 dark:text-rose-400",
    icon: AlertCircle,
  },
  info: {
    bg: "bg-sky-50 border-sky-200 dark:bg-sky-500/10 dark:border-sky-500/20",
    text: "text-sky-700 dark:text-sky-400",
    icon: Info,
  },
};

export function ToastItem({ message, variant, onClose }: Readonly<ToastItemProps>) {
  const v = VARIANTS[variant];
  const Icon = v.icon;

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 shadow-lg ${v.bg}`}
    >
      <Icon size={16} className={`mt-0.5 shrink-0 ${v.text}`} />
      <p className={`flex-1 text-sm font-medium ${v.text}`}>{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className={`shrink-0 ${v.text} opacity-60 transition-opacity hover:opacity-100`}
      >
        <X size={14} />
      </button>
    </div>
  );
}