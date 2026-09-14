import { Controller, useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { SearchableSelect } from "@/shared/components/SearchableSelect";
import { useSecteurs } from "@/shared/hooks/useReferenceData";

export function PmeStep() {
  const { control, register, formState: { errors } } = useFormContext<RegisterFormValues>();
  const { data: secteurs = [], isLoading } = useSecteurs();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Votre entreprise</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nom de l'entreprise</label>
        <input
          {...register("nomEntreprise")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        {errors.nomEntreprise && <p className="mt-1 text-xs text-red-600">{errors.nomEntreprise.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Secteurs d'activité</label>
        <Controller
          name="secteurIds"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              options={secteurs.map((s) => ({ id: s.id, label: s.nom }))}
              value={field.value ?? []}
              onChange={field.onChange}
              multiple
              isLoading={isLoading}
              placeholder="Choisir un ou plusieurs secteurs"
              error={errors.secteurIds?.message as string | undefined}
            />
          )}
        />
      </div>
    </div>
  );
}