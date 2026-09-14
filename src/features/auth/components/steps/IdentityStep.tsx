import { useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "@/features/auth/schemas/register.schema";

export function IdentityStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Qui êtes-vous ?</h2>

      <div>
        <label htmlFor="prenom" className="mb-1 block text-sm font-medium text-slate-700">
          Prénom
        </label>
        <input
          id="prenom"
          type="text"
          autoComplete="given-name"
          {...register("prenom")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          placeholder="Ibrahima"
        />
        {errors.prenom && (
          <p className="mt-1 text-xs text-red-600">{errors.prenom.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="nom" className="mb-1 block text-sm font-medium text-slate-700">
          Nom
        </label>
        <input
          id="nom"
          type="text"
          autoComplete="family-name"
          {...register("nom")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          placeholder="Thiam"
        />
        {errors.nom && (
          <p className="mt-1 text-xs text-red-600">{errors.nom.message}</p>
        )}
      </div>
    </div>
  );
}