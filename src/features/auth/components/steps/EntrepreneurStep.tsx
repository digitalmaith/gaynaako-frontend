import { Controller, useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { SearchableSelect } from "@/shared/components/SearchableSelect";
import { useSecteurs, usePays } from "@/shared/hooks/useReferenceData";

export function EntrepreneurStep() {
  const { control, register, formState: { errors } } = useFormContext<RegisterFormValues>();
  const { data: secteurs = [], isLoading: loadingSecteurs } = useSecteurs();
  const { data: pays = [], isLoading: loadingPays } = usePays();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Votre profil d'entrepreneur</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Secteur d'activité</label>
        <Controller
          name="secteurId"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              options={secteurs.map((s) => ({ id: s.id, label: s.nom }))}
              value={field.value ?? ""}
              onChange={field.onChange}
              isLoading={loadingSecteurs}
              placeholder="Choisir un secteur"
              error={errors.secteurId?.message}
            />
          )}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Pays</label>
        <Controller
          name="paysId"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              options={pays.map((p) => ({ id: p.id, label: p.nom }))}
              value={field.value ?? ""}
              onChange={field.onChange}
              isLoading={loadingPays}
              placeholder="Choisir un pays"
              error={errors.paysId?.message}
            />
          )}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Domaine d'expertise</label>
        <input
          {...register("domaineExpertise")}
          placeholder="ex: numérique"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        {errors.domaineExpertise && (
          <p className="mt-1 text-xs text-red-600">{errors.domaineExpertise.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Objectifs <span className="text-slate-400">(optionnel)</span>
        </label>
        <textarea
          {...register("objectifs")}
          rows={3}
          placeholder="ex: rendre le numérique accessible"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </div>
    </div>
  );
}