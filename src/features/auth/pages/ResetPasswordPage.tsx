import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/features/auth/services/auth.service";
import { useResendCooldown } from "@/features/auth/hooks/useResendCooldown";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/reset-password.schema";
import logo from "@/assets/logo.png";

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email;

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { secondsLeft, canResend, startCooldown } = useResendCooldown();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!email) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-slate-600">Aucune demande de réinitialisation en cours.</p>
        <Link to="/forgot-password" className="text-accent underline">
          Recommencer
        </Link>
      </div>
    );
  }

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setServerError(null);
    setIsLoading(true);
    try {
      await authService.resetPassword({
        email,
        code: values.code,
        newPassword: values.newPassword,
      });
      navigate("/login", {
        replace: true,
        state: { message: "Mot de passe réinitialisé. Connectez-vous avec vos nouveaux identifiants." },
      });
    } catch {
      setServerError("Code invalide ou expiré.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setResendMessage(null);
    setServerError(null);
    setIsResending(true);
    try {
      await authService.forgotPassword(email);
      setResendMessage("Un nouveau code a été envoyé.");
      startCooldown();
    } catch {
      setServerError("Impossible de renvoyer le code. Réessayez plus tard.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <img src={logo} alt="Gaynaako" className="mb-6 h-16 w-16" />
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold text-primary">Réinitialiser le mot de passe</h1>
        <p className="mt-2 text-sm text-slate-500">
          Un code a été envoyé à <strong>{email}</strong>. Saisissez-le avec votre nouveau mot de passe.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="code" className="mb-1 block text-sm font-medium text-slate-700">Code</label>
            <input
              id="code"
              {...register("code")}
              placeholder="Code de vérification"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-center text-lg tracking-widest outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
            {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code.message}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-slate-700">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                {...register("newPassword")}
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
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              {...register("confirmPassword")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          {serverError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>
          )}
          {resendMessage && (
            <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{resendMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-medium text-accent hover:underline disabled:opacity-60"
            >
              {isResending ? "Envoi..." : "Renvoyer le code"}
            </button>
          ) : (
            <span>
              Renvoyer le code dans <strong>{secondsLeft}s</strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}