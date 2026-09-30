// src/features/admin/components/UserCard.tsx
import { Building2, Shield, Mail, Eye } from "lucide-react";
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

interface UserCardProps {
  readonly user: AdminUser;
  readonly onView: () => void;
  readonly onDelete: () => void;
  readonly onRestore: () => void;
  readonly onStatut: (statut: UserStatut) => void;
}

export function UserCard({
  user,
  onView,
  onDelete,
  onRestore,
  onStatut,
}: UserCardProps) {
  const statut = STATUT_STYLES[user.statut];
  const initial = (user.prenom?.[0] ?? user.nom?.[0] ?? "?").toUpperCase();
  const isDeleted = !!user.supprimeLe;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 dark:border-white/10 dark:bg-white/5 dark:hover:border-accent/20 ${
        isDeleted ? "opacity-60" : ""
      }`}
    >
      {/* Halo décoratif au hover */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Header : avatar + menu */}
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          {user.pme?.logoUrl ? (
            <img
              src={user.pme.logoUrl}
              alt={user.pme.nomEntreprise}
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent text-base font-bold text-white">
              {initial}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-slate-800 dark:text-white">
              {user.prenom} {user.nom}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-white/50">
              {user.email}
            </p>
          </div>
        </div>

        {/* Menu actions */}
        <UserActionsMenu
          user={user}
          onView={onView}
          onDelete={onDelete}
          onRestore={onRestore}
          onStatut={onStatut}
        />
      </div>

      {/* Badges rôle + statut */}
      <div className="relative mt-4 flex flex-wrap gap-2">
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

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statut.bg} ${statut.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statut.dot}`} />
          {statut.label}
        </span>
      </div>

      {/* Entreprise */}
      {user.pme?.nomEntreprise && (
        <div className="relative mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/50">
          <Building2 size={11} />
          <span className="truncate">{user.pme.nomEntreprise}</span>
        </div>
      )}

      {/* Footer : date + actions rapides */}
      <div className="relative mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
        <p className="text-[11px] text-slate-400 dark:text-white/40">
          Inscrit le{" "}
          {new Date(user.dateCreation).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={onView}
            aria-label="Voir le détail"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Eye size={13} />
          </button>
          <a
            href={`mailto:${user.email}`}
            aria-label="Envoyer un email"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Mail size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}