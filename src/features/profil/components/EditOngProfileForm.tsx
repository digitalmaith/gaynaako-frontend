import { useEffect, useRef, useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { profileService } from '../services/profile.service';
import type { DomaineInterventionRef, User, UpdateOngProfilePayload } from '../types';

interface EditOngProfileFormProps {
  user: User;
  saving: boolean;
  onSubmit: (payload: UpdateOngProfilePayload) => Promise<void>;
  onUploadLogo: (file: File) => Promise<void>;
}

export function EditOngProfileForm({
  user,
  saving,
  onSubmit,
  onUploadLogo,
}: EditOngProfileFormProps) {
  const ong = user.ong;
  const [nomOrganisation, setNomOrganisation] = useState(ong?.nomOrganisation ?? '');
  const [mission, setMission] = useState(ong?.mission ?? '');
  const [selectedDomaines, setSelectedDomaines] = useState<string[]>(
    ong?.domainesIntervention.map((d) => d.id) ?? [],
  );
  const [domaines, setDomaines] = useState<DomaineInterventionRef[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(ong?.logoUrl ?? null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    profileService.getDomainesIntervention().then(setDomaines).catch(() => {});
  }, []);

  const toggleDomaine = (id: string) => {
    setSelectedDomaines((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoPreview(URL.createObjectURL(file));
    setUploadingLogo(true);
    try {
      await onUploadLogo(file);
    } finally {
      setUploadingLogo(false);
      if (logoRef.current) logoRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      nomOrganisation: nomOrganisation !== ong?.nomOrganisation ? nomOrganisation : undefined,
      mission: mission !== (ong?.mission ?? '') ? mission : undefined,
      domaineInterventionIds: selectedDomaines,
    });
  };

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/5 dark:text-white';

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 p-5 dark:border-white/10">
      <h2 className="font-medium text-slate-700 dark:text-white/80">Informations de l'ONG</h2>

      {/* Logo */}
      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => logoRef.current?.click()}
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
          ref={logoRef}
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
        Nom de l'organisation
      </label>
      <input
        type="text"
        value={nomOrganisation}
        onChange={(e) => setNomOrganisation(e.target.value)}
        className={inputClass}
      />

      <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
        Mission
      </label>
      <textarea
        value={mission}
        onChange={(e) => setMission(e.target.value)}
        rows={3}
        placeholder="Décrivez la mission de votre ONG..."
        className={inputClass}
      />

      <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
        Domaines d'intervention
      </label>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {domaines.map((d) => {
          const active = selectedDomaines.includes(d.id);
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => toggleDomaine(d.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:text-white/50 dark:hover:bg-white/5'
              }`}
            >
              {d.nom}
            </button>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-5 flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        Enregistrer les modifications
      </button>
    </form>
  );
}