import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Role } from "@/features/auth/types/auth.types";
import type { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { Building2, Users, HeartHandshake } from "lucide-react";

interface RoleStepProps {
  watch: UseFormWatch<RegisterFormValues>;
  setValue: UseFormSetValue<RegisterFormValues>;
}

const roleOptions = [
  {
    value: Role.ENTREPRENEUR,
    label: "Entrepreneur",
    description: "Porteur de projet individuel à la recherche de financements et d'opportunités.",
    icon: Users,
  },
  {
    value: Role.PME,
    label: "PME",
    description: "Entreprise structurée recherchant financements, appels d'offres et partenaires.",
    icon: Building2,
  },
  {
    value: Role.ONG,
    label: "ONG / Association",
    description: "Organisation à but non lucratif à la recherche de subventions et bailleurs.",
    icon: HeartHandshake,
  },
];

export function RoleStep({ watch, setValue }: RoleStepProps) {
  const selectedRole = watch("role");

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-primary">Quel type de compte souhaitez-vous créer ?</h2>
      <p className="mb-4 text-sm text-slate-500">
        Le type de compte détermine les opportunités qui vous seront proposées.
      </p>

      <div className="grid gap-3">
        {roleOptions.map(({ value, label, description, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setValue("role", value, { shouldValidate: true })}
            className={`flex items-start gap-4 rounded-xl border-2 p-4 text-left transition ${
              selectedRole === value
                ? "border-accent bg-accent/5"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <Icon className={selectedRole === value ? "text-accent" : "text-slate-400"} size={28} />
            <div>
              <p className="font-semibold text-primary">{label}</p>
              <p className="text-sm text-slate-500">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}