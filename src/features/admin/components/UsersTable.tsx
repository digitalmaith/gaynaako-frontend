// src/features/admin/components/UsersTable.tsx
import { User as UserIcon } from "lucide-react";
import { Skeleton } from "@/shared/components/Skeleton";
import type { AdminUser, UserStatut } from "../api/users.api";
import { UserRow } from "./UserRow";

interface UsersTableProps {
  readonly items: AdminUser[];
  readonly loading: boolean;
  readonly onView: (user: AdminUser) => void;
  readonly onDelete: (user: AdminUser) => void;
  readonly onRestore: (user: AdminUser) => void;
  readonly onStatut: (user: AdminUser, statut: UserStatut) => void;
}

export function UsersTable({
  items,
  loading,
  onView,
  onDelete,
  onRestore,
  onStatut,
}: UsersTableProps) {
  if (loading) {
    return (
      <div className="space-y-3 p-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <UserIcon size={24} />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-white">
          Aucun utilisateur trouvé
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-white/50">
          Aucun utilisateur ne correspond à ces filtres.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-white/10 dark:bg-white/5">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
              Utilisateur
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
              Rôle
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
              Statut
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
              Inscrit le
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {items.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onView={() => onView(user)}
              onDelete={() => onDelete(user)}
              onRestore={() => onRestore(user)}
              onStatut={(statut) => onStatut(user, statut)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}