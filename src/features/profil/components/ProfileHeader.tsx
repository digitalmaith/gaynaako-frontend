import { useRef } from 'react';
import { Mail, CalendarDays, Phone, Camera, Loader2 } from 'lucide-react';
import type { User } from '../types';

interface ProfileHeaderProps {
  user: User;
  saving?: boolean;
  onAvatarChange?: (file: File) => Promise<void>;
}

const ROLE_LABELS: Record<string, string> = {
  ENTREPRENEUR: 'Entrepreneur',
  PME: 'PME',
  ONG: 'ONG',
  ADMINISTRATEUR: 'Administrateur',
};

const ROLE_COLORS: Record<string, string> = {
  ENTREPRENEUR: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  PME: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
  ONG: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  ADMINISTRATEUR: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
};

export function ProfileHeader({ user, saving, onAvatarChange }: ProfileHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const initials = `${user.prenom?.[0] ?? ''}${user.nom?.[0] ?? ''}`.toUpperCase();
  const title = `${user.prenom} ${user.nom}`.trim();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onAvatarChange) return;
    await onAvatarChange(file);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/40">
      {/* Bannière gradient */}
      <div className="relative h-32 bg-gradient-to-br from-accent via-accent to-accent-light">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        </div>
      </div>

      {/* Contenu */}
      <div className="relative px-6 pb-6">
        {/* Avatar chevauchant */}
        <div className="-mt-12 mb-4 flex items-end justify-between">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={!onAvatarChange || saving}
            className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg disabled:cursor-not-allowed dark:border-slate-900 dark:bg-slate-800"
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-accent-light text-2xl font-bold text-white">
                {initials || '?'}
              </div>
            )}
            {onAvatarChange && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                {saving ? (
                  <Loader2 size={20} className="animate-spin text-white" />
                ) : (
                  <Camera size={20} className="text-white" />
                )}
              </div>
            )}
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />

        {/* Identité */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${ROLE_COLORS[user.role] ?? ROLE_COLORS.ENTREPRENEUR}`}
          >
            {ROLE_LABELS[user.role] ?? user.role}
          </span>
          {user.statut === 'ACTIF' && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Actif
            </span>
          )}
        </div>

        {/* Coordonnées */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-white/50">
          <span className="flex items-center gap-2">
            <Mail size={14} className="text-slate-400" /> {user.email}
          </span>
          {user.telephone && (
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-slate-400" /> {user.telephone}
            </span>
          )}
          <span className="flex items-center gap-2">
            <CalendarDays size={14} className="text-slate-400" /> Membre depuis le{' '}
            {new Date(user.dateCreation).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}