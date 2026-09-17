import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  orangeSoft: "#FDF0E6",
};

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden py-24"
      style={{
        background: `linear-gradient(135deg, ${BRAND.navy} 0%, #2A3A8F 50%, ${BRAND.navy} 100%)`,
      }}
    >
      {/* Motif pointillé en arrière-plan */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Orbes décoratifs lumineux */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: `${BRAND.orange}33` }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: `${BRAND.orange}22` }}
      />

      {/* Petits points lumineux flottants */}
      <div className="pointer-events-none absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-white/40" />
      <div className="pointer-events-none absolute right-[20%] top-[30%] h-3 w-3 rounded-full bg-white/30" />
      <div className="pointer-events-none absolute left-[25%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-white/50" />
      <div className="pointer-events-none absolute right-[15%] bottom-[20%] h-2 w-2 rounded-full bg-white/40" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          {/* Badge */}
          <div className="flex justify-center">
            <span
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ background: `${BRAND.orange}33`, color: "#fff" }}
            >
              <Sparkles size={12} />
              Gratuit · sans engagement
            </span>
          </div>

          {/* Titre */}
          <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
            Ne manquez plus{" "}
            <span className="relative inline-block">
              <span style={{ color: BRAND.orange }}>une seule opportunité</span>
              {/* Soulignement décoratif */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke={BRAND.orange}
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </span>
            .
          </h2>

          {/* Sous-titre */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80">
            Créez votre profil gratuitement et recevez vos premières
            recommandations dès aujourd'hui — adaptées à votre projet, votre
            secteur et votre région.
          </p>

          {/* Points rassurants */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/70">
            {[
              "Sans carte bancaire",
              "Prêt en 2 minutes",
              "Recommandations IA",
            ].map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  style={{ color: BRAND.orange }}
                  strokeWidth={2.5}
                />
                {point}
              </div>
            ))}
          </div>

          {/* Boutons CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl sm:w-auto"
              style={{
                background: BRAND.orange,
                boxShadow: `0 15px 35px -10px ${BRAND.orange}88`,
              }}
            >
              Créer mon compte gratuit
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto"
            >
              Voir une démo
            </Link>
          </div>

          {/* Note de bas */}
          <p className="mt-6 text-xs text-white/50">
            Déjà plus de 200 porteurs de projet nous font confiance au Sénégal 🇸🇳
          </p>
        </Reveal>
      </div>
    </section>
  );
}