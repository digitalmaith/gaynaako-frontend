import { useEffect, useRef, useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { profileService } from '../services/profile.service';
import type { SecteurRef, User, UpdatePmeProfilePayload } from '../types';

interface EditPmeProfileFormProps {
  user: User;
  saving: boolean;
  onSubmit: (payload: UpdatePmeProfilePayload) => Promise<void>;
  onUploadLogo: (file: File) => Promise<void>;
}

export function EditPmeProfileForm({
  user,
  saving,
  onSubmit,
  onUploadLogo,
}: EditPmeProfileFormProps) {
  const [nomEntreprise, setNomEntreprise] = useState(user.pme?.nomEntreprise ?? '');
  const [selectedSecteurs, setSelectedSecteurs] = useState<string[]>(
    user.pme?.secteurs.map((s) => s.id) ?? [],
  );
  const [secteurs, setSecteurs] = useState<SecteurRef[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(user.pme?.logoUrl ?? null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    profileService.getSecteurs().then(setSecteurs).catch(() => setSecteurs([]));
  }, []);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoPreview(URL.createObjectURL(file));
    setUploadingLogo(true);
    try {
      await onUploadLogo(file);
    } finally {
      setUploadingLogo(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const toggleSecteur = (id: string) => {
    setSelectedSecteurs((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      nomEntreprise: nomEntreprise !== user.pme?.nomEntreprise ? nomEntreprise : undefined,
      secteurIds: selectedSecteurs,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/40"
    >
      <h2 className="font-display text-lg font-semibold text-slate-800 dark:text-white">
        Informations de l'entreprise
      </h2>

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploadingLogo}
          className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 disabled:cursor-not-allowed dark:border-white/10"
        >
          {logoPreview ? (
            <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50 dark:bg-white/5">
              <UploadCloud size={18} className="text-slate-400" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            {uploadingLogo ? (
              <Loader2 size={16} className="animate-spin text-white" />
            ) : (
              <UploadCloud size={16} className="text-white" />
            )}
          </div>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />
        <p className="text-xs text-slate-400 dark:text-white/40">
          Cliquez sur le logo pour le remplacer
        </p>
      </div>

      <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
        Nom de l'entreprise
      </label>
      <input
        type="text"
        value={nomEntreprise}
        onChange={(e) => setNomEntreprise(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />

      <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
        Secteurs d'activité
      </label>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {(secteurs.length > 0 ? secteurs : user.pme?.secteurs ?? []).map((secteur) => {
          const active = selectedSecteurs.includes(secteur.id);
          return (
            <button
              key={secteur.id}
              type="button"
              onClick={() => toggleSecteur(secteur.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:text-white/50 dark:hover:bg-white/5'
              }`}
            >
              {secteur.nom}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
}