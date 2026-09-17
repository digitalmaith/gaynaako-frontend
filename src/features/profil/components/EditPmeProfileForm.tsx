// src/features/profil/components/EditPmeProfileForm.tsx
import { useEffect, useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { profileService } from "../services/profile.service";
import type { Secteur, User } from "../types";

interface EditPmeProfileFormProps {
  user: User;
  saving: boolean;
  onSubmit: (payload: { nomEntreprise?: string; secteurIds?: string[]; logo?: File }) => Promise<void>;
}

export function EditPmeProfileForm({ user, saving, onSubmit }: EditPmeProfileFormProps) {
  const [nomEntreprise, setNomEntreprise] = useState(user.pme?.nomEntreprise ?? "");
  const [selectedSecteurs, setSelectedSecteurs] = useState<string[]>(
    user.pme?.secteurs.map((s) => s.id) ?? []
  );
  const [secteurs, setSecteurs] = useState<Secteur[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(user.pme?.logoUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // ⚠️ endpoint à confirmer — si absent, retire ce useEffect et affiche les secteurs en lecture seule
    profileService.getSecteurs().then(setSecteurs).catch(() => setSecteurs([]));
  }, []);

  const handleLogoChange = (file: File | null) => {
    setLogo(file);
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const toggleSecteur = (id: string) => {
    setSelectedSecteurs((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      nomEntreprise: nomEntreprise !== user.pme?.nomEntreprise ? nomEntreprise : undefined,
      secteurIds: selectedSecteurs,
      logo: logo ?? undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 p-5 dark:border-white/10">
      <h2 className="font-medium text-slate-700 dark:text-white/80">Informations de l'entreprise</h2>

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10"
        >
          {logoPreview ? (
            <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50 dark:bg-white/5">
              <UploadCloud size={18} className="text-slate-400" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <UploadCloud size={16} className="text-white" />
          </div>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleLogoChange(e.target.files?.[0] ?? null)}
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
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
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
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:text-white/50 dark:hover:bg-white/5"
              }`}
            >
              {secteur.nom}
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