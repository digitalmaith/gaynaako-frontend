import {
  Search,
  Sparkles,
  MessageSquareText,
  LayoutDashboard,
  BellRing,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
};

const features = [
  {
    icon: Search,
    title: "Recherche avancée",
    description: "Filtrez par secteur, pays, date limite et niveau d'expérience.",
    color: BRAND.navy,
    bg: BRAND.navySoft,
  },
  {
    icon: Sparkles,
    title: "Score de pertinence",
    description: "Chaque opportunité est notée selon votre profil réel.",
    color: BRAND.orange,
    bg: BRAND.orangeSoft,
  },
  {
    icon: MessageSquareText,
    title: "Assistant conversationnel",
    description: "Posez vos questions en langage naturel, à toute heure.",
    color: BRAND.navy,
    bg: BRAND.navySoft,
  },
  {
    icon: LayoutDashboard,
    title: "Tableau de bord",
    description: "Favoris, brouillons et suivi de candidatures au même endroit.",
    color: BRAND.orange,
    bg: BRAND.orangeSoft,
  },
  {
    icon: BellRing,
    title: "Alertes intelligentes",
    description: "Par email ou WhatsApp, avant chaque date limite.",
    color: BRAND.navy,
    bg: BRAND.navySoft,
  },
  {
    icon: ShieldCheck,
    title: "Données sécurisées",
    description: "Chiffrement et conformité RGPD dès la conception.",
    color: BRAND.orange,
    bg: BRAND.orangeSoft,
  },
];

export function FeaturesSection() {
  return (
    <section
      id="fonctionnalites"
      className="relative overflow-hidden bg-white py-24"
    >
      {/* Halo décoratif */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: `${BRAND.navy}08` }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          {/* Badge */}
          <div className="flex justify-center">
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ background: BRAND.navySoft, color: BRAND.navy }}
            >
              Fonctionnalités
            </span>
          </div>

          {/* Titre */}
          <h2
            className="text-center font-display text-3xl font-semibold leading-tight md:text-4xl"
            style={{ color: BRAND.navy }}
          >
            Tout ce qu'il faut,{" "}
            <span style={{ color: BRAND.orange }}>rien de superflu</span>
          </h2>

          {/* Sous-titre */}
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink/60">
            Une boîte à outils complète pour transformer votre recherche de
            financement en opportunités concrètes.
          </p>
        </Reveal>

        {/* Grille des fonctionnalités */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, color, bg }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
                {/* Effet lumineux au survol */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-[60px] transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: color }}
                />

                {/* Icône en pastille */}
                <div
                  className="relative flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-110"
                  style={{ background: bg, color: color }}
                >
                  <Icon size={22} strokeWidth={2} />
                </div>

                {/* Titre */}
                <h3
                  className="mt-5 font-display text-base font-semibold"
                  style={{ color: BRAND.navy }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                  {description}
                </p>

                {/* Flèche décorative au survol */}
                <div
                  className="mt-4 flex h-6 w-6 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{ background: bg, color: color }}
                >
                  <ArrowUpRight size={12} strokeWidth={2.5} />
                </div>

                {/* Ligne décorative en bas au survol */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: color }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}