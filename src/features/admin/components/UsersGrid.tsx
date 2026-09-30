// src/features/admin/components/UsersGrid.tsx
import { User as UserIcon } from "lucide-react";
import { Skeleton } from "@/shared/components/Skeleton";
import type { AdminUser, UserStatut } from "../api/users.api";
import { UserCard } from "./UserCard";

interface UsersGridProps {
  readonly items: AdminUser[];
  readonly loading: boolean;
  readonly onView: (user: AdminUser) => void;
  readonly onDelete: (user: AdminUser) => void;
  readonly onRestore: (user: AdminUser) => void;
  readonly onStatut: (user: AdminUser, statut: UserStatut) => void;
}

export function UsersGrid({
  items,
  loading,
  onView,
  onDelete,
  onRestore,
  onStatut,
}: UsersGridProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 w-full rounded-2xl" />
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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onView={() => onView(user)}
          onDelete={() => onDelete(user)}
          onRestore={() => onRestore(user)}
          onStatut={(statut) => onStatut(user, statut)}
        />
      ))}
    </div>
  );
}