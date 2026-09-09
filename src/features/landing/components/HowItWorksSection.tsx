import { Reveal } from "@/shared/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Créez votre profil",
    description: "Entrepreneur, PME ou ONG — indiquez votre secteur, pays et objectifs en quelques minutes.",
  },
  {
    number: "02",
    title: "Recevez vos recommandations",
    description: "Notre moteur IA analyse chaque opportunité et vous attribue un score de correspondance clair.",
  },
  {
    number: "03",
    title: "Postulez avec l'assistant IA",
    description: "Le chatbot vous aide à vérifier votre éligibilité et à préparer votre candidature.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-primary">
            Comment ça marche
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 120}>
              <div className="relative">
                <span className="font-mono text-5xl font-semibold text-primary/10">
                  {step.number}
                </span>
                <h3 className="-mt-3 font-display text-lg font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink/60">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}