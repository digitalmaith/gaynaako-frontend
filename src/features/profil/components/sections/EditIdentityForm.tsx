import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { User, UpdateIdentityPayload } from '../../types';

interface EditIdentityFormProps {
  user: User;
  saving: boolean;
  onSubmit: (payload: UpdateIdentityPayload) => Promise<void>;
}

export function EditIdentityForm({ user, saving, onSubmit }: EditIdentityFormProps) {
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [telephone, setTelephone] = useState(user.telephone ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      nom: nom !== user.nom ? nom : undefined,
      prenom: prenom !== user.prenom ? prenom : undefined,
      telephone: telephone !== (user.telephone ?? '') ? telephone : undefined,
    });
  };

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/5 dark:text-white';

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 p-5 dark:border-white/10">
      <h2 className="font-medium text-slate-700 dark:text-white/80">Informations personnelles</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-white/50">
            Prénom
          </label>
          <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-white/50">
            Nom
          </label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-500 dark:text-white/50">
            Téléphone
          </label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="+221 77 123 45 67"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-5 flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        Enregistrer
      </button>
    </form>
  );
}