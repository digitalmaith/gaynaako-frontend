// src/features/admin/components/UserRow.tsx
import { Building2, Shield } from "lucide-react";
import type { AdminUser, UserRole, UserStatut } from "../api/users.api";
import { UserActionsMenu } from "./UserActionsMenu";

const ROLE_LABELS: Record<UserRole, string> = {
  PME: "PME",
  ONG: "ONG",
  ADMINISTRATEUR: "Administrateur",
  ENTREPRENEUR: "Entrepreneur",
};

const STATUT_STYLES: Record<
  UserStatut,
  { label: string; bg: string; text: string; dot: string }
> = {
  ACTIF: {
    label: "Actif",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  EN_ATTENTE: {
    label: "En attente",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  SUSPENDU: {
    label: "Suspendu",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    text: "text-rose-700 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  INACTIF: {
    label: "Inactif",
    bg: "bg-slate-100 dark:bg-white/5",
    text: "text-slate-600 dark:text-white/60",
    dot: "bg-slate-400",
  },
};

interface UserRowProps {
  readonly user: AdminUser;
  readonly onView: () => void;
  readonly onDelete: () => void;
  readonly onRestore: () => void;
  readonly onStatut: (statut: UserStatut) => void;
}

export function UserRow({
  user,
  onView,
  onDelete,
  onRestore,
  onStatut,
}: UserRowProps) {
  const statut = STATUT_STYLES[user.statut];
  const initial = (user.prenom?.[0] ?? user.nom?.[0] ?? "?").toUpperCase();
  const isDeleted = !!user.supprimeLe;

  return (
    <tr
      className={`transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5 ${
        isDeleted ? "opacity-60" : ""
      }`}
    >
      {/* Utilisateur */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          {user.pme?.logoUrl ? (
            <img
              src={user.pme.logoUrl}
              alt={user.pme.nomEntreprise}
              className="h-10 w-10 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent text-sm font-bold text-white">
              {initial}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
              {user.prenom} {user.nom}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-white/50">
              {user.email}
            </p>
            {user.pme?.nomEntreprise && (
              <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-slate-400 dark:text-white/40">
                <Building2 size={10} />
                {user.pme.nomEntreprise}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Rôle */}
      <td className="px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${
            user.role === "ADMINISTRATEUR"
              ? "bg-accent/10 text-accent"
              : "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-white/70"
          }`}
        >
          {user.role === "ADMINISTRATEUR" && <Shield size={10} />}
          {ROLE_LABELS[user.role]}
        </span>
      </td>

      {/* Statut */}
      <td className="px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statut.bg} ${statut.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statut.dot}`} />
          {statut.label}
        </span>
      </td>

      {/* Date */}
      <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-white/60">
        {new Date(user.dateCreation).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5 text-right">
        <UserActionsMenu
          user={user}
          onView={onView}
          onDelete={onDelete}
          onRestore={onRestore}
          onStatut={onStatut}
        />
      </td>
    </tr>
  );
}