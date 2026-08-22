import { useState } from "react";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { Upload, X } from "lucide-react";

interface Props {
  setValue: UseFormSetValue<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
}

export function LogoStep({ setValue, watch }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const logo = watch("logo");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("logo", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setValue("logo", null);
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Logo de votre organisation</h2>
      <p className="text-sm text-slate-500">
        Optionnel — vous pourrez l'ajouter plus tard depuis votre profil.
      </p>

      {preview ? (
        <div className="relative w-fit">
          <img src={preview} alt="Aperçu logo" className="h-32 w-32 rounded-lg object-cover" />
          <button
            type="button"
            onClick={removeFile}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-slate-400 hover:border-accent hover:text-accent">
          <Upload size={24} />
          <span className="mt-1 text-xs">Choisir un fichier</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      )}

      {logo && <p className="text-xs text-slate-500">{logo.name}</p>}
    </div>
  );
}