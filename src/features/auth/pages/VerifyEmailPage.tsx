import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { authService } from "@/features/auth/services/auth.service";
import { useResendCooldown } from "@/features/auth/hooks/useResendCooldown";
import { useAuthStore } from "@/app/store/authStore";
import logo from "@/assets/logo.png";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const email = (location.state as { email?: string })?.email;

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { secondsLeft, canResend, startCooldown } = useResendCooldown();

  if (!email) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-slate-600">Aucune adresse email à vérifier.</p>
        <Link to="/register" className="text-accent underline">
          Retour à l'inscription
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e:  React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { user, accessToken, refreshToken } = await authService.verifyOtp({ email, code });
      login(user, accessToken, refreshToken);
      navigate("/profile", { replace: true });
    } catch {
      setError("Code invalide ou expiré.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setResendMessage(null);
    setError(null);
    setIsResending(true);
    try {
      await authService.resendOtp(email);
      setResendMessage("Un nouveau code a été envoyé.");
      startCooldown();
    } catch {
      setError("Impossible de renvoyer le code. Réessayez plus tard.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <img src={logo} alt="Gaynaako" className="mb-6 h-16 w-16" />
      <div className="w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-primary">Vérifiez votre email</h1>
        <p className="mt-2 text-sm text-slate-500">
          Un code de vérification a été envoyé à <strong>{email}</strong>.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code de vérification"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-center text-lg tracking-widest outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {resendMessage && <p className="text-sm text-green-600">{resendMessage}</p>}

          <button
            type="submit"
            disabled={isLoading || !code}
            className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {isLoading ? "Vérification..." : "Vérifier"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-500">
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