import { useState, useEffect } from "react";import { useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { useEmailAvailability } from "@/features/auth/hooks/useEmailAvailability";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";


interface AccountStepProps {
  onEmailStatusChange?: (isTaken: boolean) => void;
}

export function AccountStep({ onEmailStatusChange }: AccountStepProps) {
  const { register, watch, formState: { errors } } = useFormContext<RegisterFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { status, checkEmail } = useEmailAvailability();

  const email = watch("email");

  const handleEmailBlur = () => {
    if (email) checkEmail(email);
  };

  useEffect(() => {
    if (status === "taken") onEmailStatusChange?.(true);
    if (status === "available") onEmailStatusChange?.(false);
  }, [status, onEmailStatusChange]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Créez votre compte</h2>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <div className="relative">
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", { onBlur: handleEmailBlur })}
            className={`w-full rounded-lg border px-3 py-2 pr-9 text-sm outline-none focus:ring-2 ${
              status === "taken"
                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                : status === "available"
                ? "border-green-400 focus:border-green-400 focus:ring-green-200"
                : "border-slate-300 focus:border-accent focus:ring-accent/30"
            }`}
            placeholder="vous@exemple.com"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {status === "checking" && <Loader2 size={16} className="animate-spin text-slate-400" />}
            {status === "available" && <CheckCircle2 size={16} className="text-green-500" />}
            {status === "taken" && <XCircle size={16} className="text-red-500" />}
          </span>
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        {!errors.email && status === "taken" && (
          <p className="mt-1 text-xs text-red-600">Cet email est déjà utilisé.</p>
        )}
        {!errors.email && status === "available" && (
          <p className="mt-1 text-xs text-green-600">Email disponible.</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">Mot de passe</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("password")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-9 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
          Confirmer le mot de passe
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("confirmPassword")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-9 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>
    </div>
  );
}