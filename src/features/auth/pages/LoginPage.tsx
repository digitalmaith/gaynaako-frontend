// src/features/auth/pages/LoginPage.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import { authService } from "@/features/auth/services/auth.service";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/login.schema";
import logo from "@/assets/logo.jpeg";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Globe, Target } from "lucide-react";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = (location.state as { message?: string })?.message;
  const login = useAuthStore((state) => state.login);

  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    setIsLoading(true);
    try {
      const { user, accessToken, refreshToken } = await authService.login(values);
      login(user, accessToken, refreshToken);

      const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? "/profile";
        navigate(redirectTo, { replace: true });
    } catch {
      setServerError("Email ou mot de passe incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white transition-colors duration-300 dark:bg-gray-950">
      {/* --- Panneau branding (gauche) --- */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden lg:flex">
        {/* Fond avec dégradé dynamique */}
        <div className="absolute inset-0 bg-brand-gradient" />
        
        {/* Effets décoratifs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>

        {/* Grille décorative */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="relative z-10 flex flex-col items-center px-8 text-center">
          <div className="mb-8 rounded-2xl bg-white/10 p-2 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20">
            <img src={logo} alt="Gaynaako Opportunity Agent" className="h-18 w-18 rounded-2xl" />
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-white">
            <span className="block">Gaynaako</span>
            <span className="block text-xl font-light text-white/80">
              Opportunity Agent
            </span>
          </h1>
          
          <p className="mb-8 max-w-sm text-sm text-white/70">
            Centralisez, analysez et saisissez les meilleures opportunités grâce à l'IA.
          </p>

          <div className="grid w-full max-w-xs grid-cols-1 gap-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10">
              <Globe className="h-5 w-5 shrink-0 text-accent-light" />
              <span className="text-sm text-white/80">
                Veille intelligente multi-sources
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10">
              <Sparkles className="h-5 w-5 shrink-0 text-accent-light" />
              <span className="text-sm text-white/80">
                Recommandation personnalisée par IA
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10">
              <Target className="h-5 w-5 shrink-0 text-accent-light" />
              <span className="text-sm text-white/80">
                Accompagnement chatbot intelligent
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-white/40">
          © 2026 Gaynaako. Tous droits réservés.
        </div>
      </div>

      {/* --- Panneau formulaire (droite) --- */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        {/* Theme Toggle - Positionné en haut à droite */}
        <div className="absolute right-6 top-6">
          <ThemeToggle variant="compact" />
        </div>

        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700">
          {/* Logo mobile */}
          <div className="lg:hidden">
            <img src={logo} alt="Gaynaako" className="mx-auto h-16 w-16" />
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-primary dark:text-white">
              Bienvenue
            </h2>
            <p className="text-gray-600 transition-colors dark:text-gray-400">
              Connectez-vous pour accéder à votre espace
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Champ Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 transition-colors dark:text-gray-300">
                Adresse email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400 transition-colors dark:text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={`w-full rounded-xl border ${
                    errors.email 
                      ? "border-red-300 dark:border-red-700" 
                      : "border-gray-200 dark:border-gray-700"
                  } bg-white pl-10 pr-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-accent/30`}
                  placeholder="vous@exemple.com"
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1 text-xs text-red-600 animate-in slide-in-from-top-1 dark:text-red-400">
                  <span className="inline-block h-1 w-1 rounded-full bg-red-600 dark:bg-red-400" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 transition-colors dark:text-gray-300">
                  Mot de passe
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-light"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400 transition-colors dark:text-gray-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password")}
                  className={`w-full rounded-xl border ${
                    errors.password 
                      ? "border-red-300 dark:border-red-700" 
                      : "border-gray-200 dark:border-gray-700"
                  } bg-white pl-10 pr-12 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-accent/30`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {successMessage && (
                <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{successMessage}</p>
              )}
              {errors.password && (
                <p className="flex items-center gap-1 text-xs text-red-600 animate-in slide-in-from-top-1 dark:text-red-400">
                  <span className="inline-block h-1 w-1 rounded-full bg-red-600 dark:bg-red-400" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Erreur serveur */}
            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-600 backdrop-blur-sm animate-in slide-in-from-top-2 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
                  {serverError}
                </div>
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-accent px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-[1.02] hover:bg-accent-dark hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 dark:shadow-accent/20 dark:hover:shadow-accent/30"
            >
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Lien création de compte */}
          <div className="text-center">
            <p className="text-sm text-gray-600 transition-colors dark:text-gray-400">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="font-semibold text-accent transition-colors hover:text-accent-dark hover:underline dark:hover:text-accent-light underline-offset-2"
              >
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Séparateur avec texte */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 transition-colors dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 transition-colors dark:bg-gray-950 dark:text-gray-500">
                Sécurisé
              </span>
            </div>
          </div>

          {/* Indicateur de sécurité */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 transition-colors dark:text-gray-500">
            <span className="flex items-center gap-1">🔒 Connexion sécurisée</span>
            <span className="h-1 w-1 rounded-full bg-gray-300 transition-colors dark:bg-gray-700" />
            <span className="flex items-center gap-1">🛡️ Protection des données</span>
          </div>

          {/* Version */}
          <p className="text-center text-xs text-gray-400 transition-colors dark:text-gray-600">
            Version 2.0.0
          </p>
        </div>
      </div>
    </div>
  );
}