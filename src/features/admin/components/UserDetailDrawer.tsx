import { X, Mail, Calendar, Building2, Shield, MapPin } from "lucide-react";
import type { AdminUser, UserStatut } from "../api/users.api";

const STATUT_LABELS: Record<UserStatut, string> = {
  ACTIF: "Actif",
  EN_ATTENTE: "En attente",
  SUSPENDU: "Suspendu",
  INACTIF: "Inactif",
};

interface Props {
  readonly user: AdminUser;
  readonly onClose: () => void;
}

export function UserDetailDrawer({ user, onClose }: Props) {
  const initial = (user.prenom?.[0] ?? user.nom?.[0] ?? "?").toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Fermer le panneau"
        onClick={onClose}
        className="flex-1 cursor-default border-0 bg-black/40 p-0"
        />

      <div className="w-full max-w-md overflow-y-auto bg-white shadow-xl dark:bg-[#0f1435]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#0f1435]">
          <h2 className="font-display text-lg font-bold text-primary dark:text-white">
            Détail utilisateur
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          {/* Avatar + nom */}
          <div className="flex items-center gap-4">
            {user.pme?.logoUrl ? (
              <img
                src={user.pme.logoUrl}
                alt={user.pme.nomEntreprise}
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-xl font-bold text-white">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-bold text-slate-800 dark:text-white">
                {user.prenom} {user.nom}
              </p>
              <p className="truncate text-sm text-slate-500 dark:text-white/50">
                {user.email}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-white/5 dark:text-white/70">
              <Shield size={11} />
              {user.role}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {STATUT_LABELS[user.statut]}
            </span>
          </div>

          {/* Infos */}
          <div className="mt-6 space-y-4">
            <InfoRow icon={Mail} label="Email" value={user.email} />
            <InfoRow
              icon={Calendar}
              label="Inscrit le"
              value={new Date(user.dateCreation).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            />
            {user.supprimeLe && (
              <InfoRow
                icon={Calendar}
                label="Supprimé le"
                value={new Date(user.supprimeLe).toLocaleDateString("fr-FR")}
              />
            )}
          </div>

          {/* Entreprise */}
          {user.pme && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                Entreprise
              </p>
              <div className="space-y-3">
                <InfoRow
                  icon={Building2}
                  label="Nom"
                  value={user.pme.nomEntreprise}
                />
                {user.pme.secteurs.length > 0 && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0 text-slate-400 dark:text-white/40"
                    />
                    <div>
                      <p className="text-xs text-slate-400 dark:text-white/40">
                        Secteurs
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {user.pme.secteurs.map((s) => (
                          <span
                            key={s.id}
                            className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-white/70"
                          >
                            {s.nom}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  readonly icon: React.ElementType;
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={14}
        className="mt-0.5 shrink-0 text-slate-400 dark:text-white/40"
      />
      <div className="min-w-0">
        <p className="text-xs text-slate-400 dark:text-white/40">{label}</p>
        <p className="truncate text-sm font-medium text-slate-700 dark:text-white/80">
          {value}
        </p>
      </div>
    </div>
  );
}