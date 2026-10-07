// src/features/assistant/components/AssistantRail.tsx
import { useNavigate } from "react-router-dom";
import { Compass, Sparkles, MessageCircle, Settings, LogOut } from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { useState } from "react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export function AssistantRail() {
  const navigate = useNavigate();
  const { performLogout, isLoading: isLoggingOut } = useLogout();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-14 shrink-0 flex-col items-center border-r border-slate-200 bg-white/80 py-4 backdrop-blur-lg dark:border-white/10 dark:bg-[#0b0f2b]/80 sm:flex">
        <button
          onClick={() => navigate("/app/dashboard")}
          title="Retour au dashboard"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            "text-slate-500 transition-colors hover:bg-slate-100",
            "dark:text-white/60 dark:hover:bg-white/5"
          )}
        >
          <Compass size={18} />
        </button>

        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            title="Assistant"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"
          >
            <Sparkles size={16} />
          </button>

          <button
            title="Conversations"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              "text-slate-500 transition-colors hover:bg-slate-100",
              "dark:text-white/60 dark:hover:bg-white/5"
            )}
          >
            <MessageCircle size={18} />
          </button>
        </div>

        <div className="mt-auto flex flex-col items-center gap-2">
          <button
            onClick={() => navigate("/app/profile")}
            title="Paramètres"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              "text-slate-500 transition-colors hover:bg-slate-100",
              "dark:text-white/60 dark:hover:bg-white/5"
            )}
          >
            <Settings size={18} />
          </button>

          <button
            onClick={() => setLogoutDialogOpen(true)}
            title="Déconnexion"
            className="flex h-9 w-9 items-center justify-center rounded-full text-red-500/70 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <ConfirmDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={performLogout}
        title="Se déconnecter ?"
        description="Vous devrez vous reconnecter pour accéder à votre espace Gaynaako."
        confirmLabel="Se déconnecter"
        cancelLabel="Annuler"
        variant="danger"
        isLoading={isLoggingOut}
      />
    </>
  );
}