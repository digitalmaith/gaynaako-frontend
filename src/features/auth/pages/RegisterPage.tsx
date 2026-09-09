import { useState, type ReactNode } from "react";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Sparkles,
  Globe,
  Target,
} from "lucide-react";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/register.schema";

import { authService } from "@/features/auth/services/auth.service";
import { Role } from "@/features/auth/types/auth.types";

import { RoleStep } from "@/features/auth/components/steps/RoleStep";
import { IdentityStep } from "@/features/auth/components/steps/IdentityStep";
import { AccountStep } from "@/features/auth/components/steps/AccountStep";
import { EntrepreneurStep } from "@/features/auth/components/steps/EntrepreneurStep";
import { PmeStep } from "@/features/auth/components/steps/PmeStep";
import { OngStep } from "@/features/auth/components/steps/OngStep";
import { LogoStep } from "@/features/auth/components/steps/LogoStep";

import { StepIndicator } from "@/features/auth/components/StepIndicator";

import logo from "@/assets/logo.jpeg";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: Role.ENTREPRENEUR,
      secteurIds: [],
      domainesInterventionIds: [],
    },
  });

  const { handleSubmit, watch, setValue, trigger } = methods;

  const role = useWatch({
    control: methods.control,
    name: "role",
  });

  const hasLogoStep = role === Role.PME || role === Role.ONG;

  // 0 Rôle, 1 Identité, 2 Compte, 3 Infos rôle, (4 Logo si PME/ONG)
  const totalSteps = hasLogoStep ? 5 : 4;

  const fieldsForStep = (
    step: number,
  ): (keyof RegisterFormValues)[] => {
    if (step === 0) {
      return ["role"];
    }

    if (step === 1) {
      return ["nom", "prenom"];
    }

    if (step === 2) {
      return ["email", "password", "confirmPassword"];
    }

    if (step === 3) {
      if (role === Role.ENTREPRENEUR) {
        return ["secteurId", "paysId", "domaineExpertise"];
      }

      if (role === Role.PME) {
        return ["nomEntreprise", "secteurIds"];
      }

      if (role === Role.ONG) {
        return ["nomOrganisation", "domainesInterventionIds"];
      }
    }

    return [];
  };

  const goNext = async () => {
    if (currentStep === 2 && isEmailTaken) {
      return;
    }

    const valid = await trigger(fieldsForStep(currentStep));

    console.log(
      "Validation étape",
      currentStep,
      "→",
      valid,
      "erreurs:",
      methods.formState.errors,
    );

    if (valid) {
      setCurrentStep((step) => step + 1);
    }
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(0, step - 1));
  };

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const { email } = await authService.register(values);

      navigate("/verify-email", {
        state: { email },
        replace: true,
      });
    } catch {
      setServerError(
        "Une erreur est survenue. Vérifiez vos informations et réessayez.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isLastStep = currentStep === totalSteps - 1;

  // Contenu du bouton : correction SonarQube S3358
  let buttonContent: ReactNode;

  if (isLoading) {
    buttonContent = (
      <Loader2
        className="animate-spin"
        size={16}
      />
    );
  } else if (isLastStep) {
    buttonContent = "Créer mon compte";
  } else {
    buttonContent = (
      <>
        Suivant <ArrowRight size={16} />
      </>
    );
  }

  return (
    <div className="flex min-h-screen">
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-8 text-center">
          <div className="mb-8 rounded-2xl bg-white/10 p-2 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20">
            <img
              src={logo}
              alt="Gaynaako Opportunity Agent"
              className="h-18 w-18 rounded-2xl"
            />
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white">
            <span className="block">Gaynaako</span>

            <span className="block text-xl font-light text-white/80">
              Opportunity Agent
            </span>
          </h1>

          <p className="mb-8 max-w-sm text-sm text-white/70">
            Rejoignez la communauté des entrepreneurs, PME et ONG connectés
            aux meilleures opportunités.
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

      {/* Formulaire */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <img
            src={logo}
            alt="Gaynaako"
            className="mx-auto mb-6 h-16 w-16 lg:hidden"
          />

          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={
                isLastStep
                  ? handleSubmit(onSubmit)
                  : (event) => {
                      event.preventDefault();
                      void goNext();
                    }
              }
              noValidate
            >
              {currentStep === 0 && (
                <RoleStep
                  watch={watch}
                  setValue={setValue}
                />
              )}

              {currentStep === 1 && <IdentityStep />}

              {currentStep === 2 && (
                <AccountStep
                  onEmailStatusChange={setIsEmailTaken}
                />
              )}

              {currentStep === 3 &&
                role === Role.ENTREPRENEUR && (
                  <EntrepreneurStep />
                )}

              {currentStep === 3 &&
                role === Role.PME && (
                  <PmeStep />
                )}

              {currentStep === 3 &&
                role === Role.ONG && (
                  <OngStep />
                )}

              {currentStep === 4 &&
                hasLogoStep && (
                  <LogoStep
                    watch={watch}
                    setValue={setValue}
                  />
                )}

              {serverError && (
                <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {serverError}
                </p>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    <ArrowLeft size={16} />
                    Retour
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-1 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
                >
                  {buttonContent}
                </button>
              </div>
            </form>
          </FormProvider>

          <p className="mt-6 text-center text-sm text-slate-500">
            Déjà un compte ?{" "}

            <Link
              to="/login"
              className="font-medium text-accent hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}