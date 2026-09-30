import { useCallback, useMemo, useState } from "react";
import { ToastContext, type ToastVariant } from "./ToastContext";
import { ToastItem } from "./ToastItem";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

// ─────────────────────────────────────────────
// Compteur global pour IDs uniques
// ─────────────────────────────────────────────
let toastCounter = 0;

// ─────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────
export function ToastProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  console.log("🟢 ToastProvider RENDER");   
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ─── Push (stable) ───
  const push = useCallback((message: string, variant: ToastVariant) => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // ─── Remove (stable) ───
  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ─── API stable ───
  // ✅ useMemo évite de recréer l'objet à chaque render
  // ✅ Dépend de `push` qui est lui-même stable
  const api = useMemo(
    () => ({
      success: (m: string) => push(m, "success"),
      error: (m: string) => push(m, "error"),
      info: (m: string) => push(m, "info"),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* Container des toasts */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-100 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
            onClose={() => remove(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}