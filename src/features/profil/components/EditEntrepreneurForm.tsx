import { useEffect, useRef, useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { profileService } from '../services/profile.service';
import type { PaysRef, SecteurRef, User, UpdateEntrepreneurProfilePayload } from '../types';

interface EditEntrepreneurFormProps {
  user: User;
  saving: boolean;
  onSubmit: (payload: UpdateEntrepreneurProfilePayload) => Promise<void>;
  onUploadLogo: (file: File) => Promise<void>;
}

export function EditEntrepreneurForm({
  user,
  saving,
  onSubmit,
  onUploadLogo,
}: EditEntrepreneurFormProps) {
  const ep = user.entrepreneur;
  const [domaineExpertise, setDomaineExpertise] = useState(ep?.domaineExpertise ?? '');
  const [objectifs, setObjectifs] = useState(ep?.objectifs ?? '');
  const [secteurId, setSecteurId] = useState(ep?.secteurId ?? '');
  const [paysId, setPaysId] = useState(ep?.paysId ?? '');

  const [secteurs, setSecteurs] = useState<SecteurRef[]>([]);
  const [pays, setPays] = useState<PaysRef[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(ep?.logoUrl ?? null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    profileService.getSecteurs().then(setSecteurs).catch(() => {});
    profileService.getPays().then(setPays).catch(() => {});
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
      // Reset l'input pour permettre de re-sélectionner le même fichier
      if (logoRef.current) logoRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      domaineExpertise: domaineExpertise !== ep?.domaineExpertise ? domaineExpertise : undefined,
      objectifs: objectifs !== (ep?.objectifs ?? '') ? objectifs : undefined,
      secteurId: secteurId !== ep?.secteurId ? secteurId : undefined,
      paysId: paysId !== ep?.paysId ? paysId : undefined,
    });
  };

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/5 dark:text-white';

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 p-5 dark:border-white/10">
      <h2 className="font-medium text-slate-700 dark:text-white/80">
        Informations professionnelles
      </h2>

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
          Logo de votre projet (optionnel)
        </p>
      </div>

      {/* Secteur */}
      <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
        Secteur d'activité
      </label>
      <select value={secteurId} onChange={(e) => setSecteurId(e.target.value)} className={inputClass}>
        <option value="">— Sélectionner —</option>
        {secteurs.map((s) => (
          <option key={s.id} value={s.id}>{s.nom}</option>
        ))}
      </select>

      {/* Pays */}
      <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
        Pays
      </label>
      <select value={paysId} onChange={(e) => setPaysId(e.target.value)} className={inputClass}>
        <option value="">— Sélectionner —</option>
        {pays.map((p) => (
          <option key={p.id} value={p.id}>{p.nom}</option>
        ))}
      </select>

      {/* Expertise */}
      <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
        Domaine d'expertise
      </label>
      <input
        type="text"
        value={domaineExpertise}
        onChange={(e) => setDomaineExpertise(e.target.value)}
        placeholder="Ex: numerique, finance, marketing..."
        className={inputClass}
      />

      {/* Objectifs */}
      <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
        Objectifs
      </label>
      <textarea
        value={objectifs}
        onChange={(e) => setObjectifs(e.target.value)}
        rows={3}
        placeholder="Décrivez vos objectifs..."
        className={inputClass}
      />

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