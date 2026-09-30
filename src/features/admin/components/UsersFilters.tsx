// src/features/admin/components/UsersFilters.tsx
import { Search, Filter, X } from "lucide-react";
import type { UserRole, UserStatut } from "../api/users.api";

const ROLE_LABELS: Record<UserRole, string> = {
  PME: "PME",
  ONG: "ONG",
  ADMINISTRATEUR: "Administrateur",
  ENTREPRENEUR: "Entrepreneur",
};

const STATUT_LABELS: Record<UserStatut, string> = {
  ACTIF: "Actif",
  EN_ATTENTE: "En attente",
  SUSPENDU: "Suspendu",
  INACTIF: "Inactif",
};

interface UsersFiltersProps {
  readonly search: string;
  readonly role: UserRole | "";
  readonly statut: UserStatut | "";
  readonly onSearchChange: (v: string) => void;
  readonly onRoleChange: (v: UserRole | "") => void;
  readonly onStatutChange: (v: UserStatut | "") => void;
  readonly onReset: () => void;
}

export function UsersFilters({
  search,
  role,
  statut,
  onSearchChange,
  onRoleChange,
  onStatutChange,
  onReset,
}: UsersFiltersProps) {
  const hasFilters = !!(role || statut || search);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
          <Filter size={11} />
          Filtres
        </span>

        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value as UserRole | "")}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-accent focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white/80"
        >
          <option value="">Tous les rôles</option>
          {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>

        <select
          value={statut}
          onChange={(e) => onStatutChange(e.target.value as UserStatut | "")}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-accent focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white/80"
        >
          <option value="">Tous les statuts</option>
          {(Object.keys(STATUT_LABELS) as UserStatut[]).map((s) => (
            <option key={s} value={s}>
              {STATUT_LABELS[s]}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:text-white/50 dark:hover:bg-white/10"
          >
            <X size={12} />
            Réinitialiser
          </button>
        )}
      </div>

      <div className="relative w-full lg:max-w-xs">
        <Search
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par nom, email, entreprise..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-accent focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:bg-white/10"
        />
      </div>
    </div>
  );
}