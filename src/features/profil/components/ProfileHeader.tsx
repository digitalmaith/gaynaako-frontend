// src/features/profil/components/ProfileHeader.tsx
import { Building2, Mail, CalendarDays } from "lucide-react";
import type { User } from "../types";

export function ProfileHeader({ user }: { user: User }) {
  const logoUrl = user.pme?.logoUrl ?? user.ong?.logoUrl ?? null;
  const title = user.pme?.nomEntreprise ?? user.ong?.nomOrganisation ?? `${user.prenom} ${user.nom}`;

  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-slate-200 p-5 sm:flex-row sm:items-center dark:border-white/10">
      {logoUrl ? (
        <img src={logoUrl} alt={title} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 dark:bg-white/10">
          <Building2 size={24} className="text-primary dark:text-white/60" />
        </div>
      )}

      <div className="min-w-0">
        <h1 className="font-display text-xl font-semibold text-slate-800 dark:text-white">
          {title}
        </h1>
        <p className="text-sm text-slate-400 dark:text-white/40">
          {user.prenom} {user.nom}
        </p>

        <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400 dark:text-white/40">
          <span className="flex items-center gap-1.5">
            <Mail size={12} /> {user.email}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays size={12} /> Membre depuis le{" "}
            {new Date(user.dateCreation).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>
    </div>
  );
}