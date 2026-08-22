import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { registerSchema, type RegisterFormValues } from "@/features/auth/schemas/register.schema";
import { authService } from "@/features/auth/services/auth.service";
import { Role } from "@/features/auth/types/auth.types";
import { RoleStep } from "@/features/auth/components/steps/RoleStep";
import { AccountStep } from "@/features/auth/components/steps/AccountStep";
import { EntrepreneurStep } from "@/features/auth/components/steps/EntrepreneurStep";
import { PmeStep } from "@/features/auth/components/steps/PmeStep";
import { OngStep } from "@/features/auth/components/steps/OngStep";
import { LogoStep } from "@/features/auth/components/steps/LogoStep";
import { StepIndicator } from "@/features/auth/components/StepIndicator";
import logo from "@/assets/logo.png";

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

  const role = watch("role");
  const hasLogoStep = role === Role.PME || role === Role.ONG;
  const totalSteps = hasLogoStep ? 4 : 3;

  const fieldsForStep = (step: number): (keyof RegisterFormValues)[] => {
  if (step === 0) return ["role"];
  if (step === 1) return ["email", "password", "confirmPassword"];
  if (step === 2) {
    if (role === Role.ENTREPRENEUR) return ["secteurId", "paysId", "domaineExpertise"];
    if (role === Role.PME) return ["nomEntreprise", "secteurIds"];
    if (role === Role.ONG) return ["nomOrganisation", "domainesInterventionIds"];
  }
  return [];
};

  const goNext = async () => {
  if (currentStep === 1 && isEmailTaken) return;
  const valid = await trigger(fieldsForStep(currentStep));
  console.log("Validation étape", currentStep, "→", valid, "erreurs:", methods.formState.errors);
  if (valid) setCurrentStep((s) => s + 1);
};

  const goBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
    setIsLoading(true);
    try {
      const { email } = await authService.register(values);
      navigate("/verify-email", { state: { email }, replace: true });
    } catch {
      setServerError("Une erreur est survenue. Vérifiez vos informations et réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-brand-gradient lg:flex">
        <img src={logo} alt="Gaynaako" className="mb-6 h-32 w-32" />
        <h1 className="text-3xl font-bold text-white">Gaynaako Opportunity Agent</h1>
        <p className="mt-3 max-w-sm text-center text-white/80">
          Rejoignez la communauté des entrepreneurs, PME et ONG connectés aux meilleures opportunités.
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <img src={logo} alt="Gaynaako" className="mx-auto mb-6 h-16 w-16 lg:hidden" />

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <FormProvider {...methods}>
            <form
              onSubmit={
                isLastStep
                  ? handleSubmit(onSubmit)
                  : (e) => {
                      e.preventDefault();
                      void goNext();
                    }
              }
              noValidate
            >
              {currentStep === 0 && <RoleStep watch={watch} setValue={setValue} />}

              {currentStep === 1 && <AccountStep onEmailStatusChange={setIsEmailTaken} />}

              {currentStep === 2 && role === Role.ENTREPRENEUR && <EntrepreneurStep />}
              {currentStep === 2 && role === Role.PME && <PmeStep />}
              {currentStep === 2 && role === Role.ONG && <OngStep />}

              {currentStep === 3 && hasLogoStep && <LogoStep watch={watch} setValue={setValue} />}

              {serverError && (
                <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    <ArrowLeft size={16} /> Retour
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-1 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : isLastStep ? (
                    "Créer mon compte"
                  ) : (
                    <>
                      Suivant <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </FormProvider>

          <p className="mt-6 text-center text-sm text-slate-500">
            Déjà un compte ?{" "}
            <Link to="/login" className="font-medium text-accent hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}