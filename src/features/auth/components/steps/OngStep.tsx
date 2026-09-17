import { Controller, useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { SearchableSelect } from "@/shared/components/SearchableSelect";
import { useDomainesIntervention } from "@/shared/hooks/useReferenceData";

export function OngStep() {
  const { control, register, formState: { errors } } = useFormContext<RegisterFormValues>();
  const { data: domaines = [], isLoading } = useDomainesIntervention();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Votre organisation</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nom de l'organisation</label>
        <input
          {...register("nomOrganisation")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        {errors.nomOrganisation && (
          <p className="mt-1 text-xs text-red-600">{errors.nomOrganisation.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Domaines d'intervention</label>
        <Controller
          name="domainesInterventionIds"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              options={domaines.map((d) => ({ id: d.id, label: d.nom }))}
              value={field.value ?? []}
              onChange={field.onChange}
              multiple
              isLoading={isLoading}
              placeholder="Choisir un ou plusieurs domaines"
              error={errors.domainesInterventionIds?.message as string | undefined}
            />
          )}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Mission <span className="text-slate-400">(optionnel)</span>
        </label>
        <textarea
          {...register("mission")}
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </div>
    </div>
  );
}