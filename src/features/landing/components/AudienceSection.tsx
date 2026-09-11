import { Users, Building2, HeartHandshake, Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
};

const audiences = [
  {
    icon: Users,
    title: "Entrepreneurs",
    tagline: "Porteurs de projet & startups",
    color: BRAND.navy,
    bg: BRAND.navySoft,
    needs: [
      "Financements et concours adaptés à votre profil",
      "Score d'éligibilité instantané",
      "Alertes avant chaque échéance",
    ],
    cta: "Trouver un financement",
  },
  {
    icon: Building2,
    title: "PME",
    tagline: "Entreprises en croissance",
    color: BRAND.orange,
    bg: BRAND.orangeSoft,
    needs: [
      "Appels d'offres nationaux et internationaux",
      "Suivi de plusieurs candidatures",
      "Statistiques d'opportunités consultées",
    ],
    cta: "Explorer les appels d'offres",
    highlighted: true, // carte mise en avant
  },
  {
    icon: HeartHandshake,
    title: "ONG & Associations",
    tagline: "Organisations à impact social",
    color: BRAND.navy,
    bg: BRAND.navySoft,
    needs: [
      "Subventions et bailleurs de fonds ciblés",
      "Recommandations selon votre mission",
      "Candidatures préparées avec l'IA",
    ],
    cta: "Découvrir les subventions",
  },
];

export function AudienceSection() {
  return (
    <section
      id="pour-qui"
      className="relative overflow-hidden bg-[#FAFBFD] py-24"
    >
      {/* Halo décoratif */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: `${BRAND.orange}10` }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          {/* Badge */}
          <div className="flex justify-center">
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
            >
              Pour qui ?
            </span>
          </div>

          {/* Titre */}
          <h2
            className="text-center font-display text-3xl font-semibold leading-tight md:text-4xl"
            style={{ color: BRAND.navy }}
          >
            Pensé pour{" "}
            <span style={{ color: BRAND.orange }}>
              chaque type de structure
            </span>
          </h2>

          {/* Sous-titre */}
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink/60">
            Que vous soyez entrepreneur, PME ou organisation à impact, Gaynaako
            s'adapte à vos besoins et à vos objectifs de financement.
          </p>
        </Reveal>

        {/* Cartes */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {audiences.map((audience, i) => {
            const Icon = audience.icon;
            return (
              <Reveal key={audience.title} delay={i * 120}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    audience.highlighted
                      ? "border-transparent shadow-lg"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  style={
                    audience.highlighted
                      ? {
                          boxShadow: `0 20px 40px -15px ${audience.color}44`,
                          borderColor: `${audience.color}33`,
                        }
                      : {}
                  }
                >
                  {/* Bandeau coloré en haut (uniquement pour la carte mise en avant) */}
                  {audience.highlighted && (
                    <div
                      className="absolute left-0 top-0 h-1 w-full"
                      style={{ background: audience.color }}
                    />
                  )}

                  {/* Icône */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-110"
                    style={{
                      background: audience.bg,
                      color: audience.color,
                    }}
                  >
                    <Icon size={26} strokeWidth={2} />
                  </div>

                  {/* Titre */}
                  <h3
                    className="mt-5 font-display text-xl font-semibold"
                    style={{ color: BRAND.navy }}
                  >
                    {audience.title}
                  </h3>

                  {/* Tagline */}
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {audience.tagline}
                  </p>

                  {/* Liste des besoins avec checkmarks */}
                  <ul className="mt-5 flex-1 space-y-3">
                    {audience.needs.map((need) => (
                      <li key={need} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{
                            background: audience.bg,
                            color: audience.color,
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-relaxed text-ink/70">
                          {need}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#register"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition group-hover:gap-3"
                    style={{ color: audience.color }}
                  >
                    {audience.cta}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}