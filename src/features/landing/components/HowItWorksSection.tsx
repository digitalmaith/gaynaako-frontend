import { UserPlus, Sparkles, Send, ArrowRight } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
};

const steps = [
  {
    number: "01",
    title: "Créez votre profil",
    description:
      "Entrepreneur, PME ou ONG — indiquez votre secteur, votre région et vos objectifs en quelques minutes.",
    icon: UserPlus,
    color: BRAND.navy,
    bg: BRAND.navySoft,
  },
  {
    number: "02",
    title: "Recevez vos recommandations",
    description:
      "Notre moteur IA analyse chaque opportunité et vous attribue un score de correspondance clair.",
    icon: Sparkles,
    color: BRAND.orange,
    bg: BRAND.orangeSoft,
  },
  {
    number: "03",
    title: "Postulez avec l'assistant IA",
    description:
      "Le chatbot vous aide à vérifier votre éligibilité et à préparer votre candidature.",
    icon: Send,
    color: BRAND.navy,
    bg: BRAND.navySoft,
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="comment-ca-marche"
      className="relative overflow-hidden bg-white py-24"
    >
      {/* Halo décoratif */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: `${BRAND.orange}12` }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          {/* Badge */}
          <div className="flex justify-center">
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
            >
              Simple & rapide
            </span>
          </div>

          {/* Titre */}
          <h2
            className="text-center font-display text-3xl font-semibold leading-tight md:text-4xl"
            style={{ color: BRAND.navy }}
          >
            Comment ça marche
          </h2>

          {/* Sous-titre */}
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink/60">
            Trois étapes pour connecter votre projet aux bonnes opportunités
            de financement au Sénégal.
          </p>
        </Reveal>

        {/* Étapes */}
        <div className="relative mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
          
          {/* Ligne de connexion (desktop uniquement) */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px md:block">
            <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-between px-20">
              <div className="h-px flex-1 border-t border-dashed border-slate-300" />
              <div className="h-px flex-1 border-t border-dashed border-slate-300" />
            </div>
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={i * 120}>
                <div className="group relative flex flex-col items-center text-center">
                  {/* Icône circulaire */}
                  <div
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg transition group-hover:scale-110"
                    style={{
                      background: step.bg,
                      color: step.color,
                      boxShadow: `0 10px 30px -10px ${step.color}55`,
                    }}
                  >
                    <Icon size={32} strokeWidth={2} />

                    {/* Numéro en badge */}
                    <span
                      className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
                      style={{ background: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3
                    className="mt-6 font-display text-lg font-semibold"
                    style={{ color: BRAND.navy }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA de bas de section */}
        <Reveal delay={400}>
          <div className="mt-16 flex justify-center">
            <a
              href="#register"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl"
              style={{
                background: BRAND.orange,
                boxShadow: `0 10px 25px -5px ${BRAND.orange}66`,
              }}
            >
              Démarrer gratuitement
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}