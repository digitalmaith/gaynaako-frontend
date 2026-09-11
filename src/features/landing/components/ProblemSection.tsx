import { useEffect, useRef, useState } from "react";
import { Globe, Share2, Building, ArrowRight } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
};

const sources = [
  { icon: Globe, label: "Sites institutionnels", desc: "DER/FJ, 3FPT, FONGIP…", color: BRAND.navy, bg: BRAND.navySoft },
  { icon: Share2, label: "Réseaux sociaux", desc: "Pages officielles & annonces", color: BRAND.orange, bg: BRAND.orangeSoft },
  { icon: Building, label: "Portails gouvernementaux", desc: "Marchés publics, appels à projets", color: BRAND.navy, bg: BRAND.navySoft },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 🎯 Déclenchement précoce (commence avant que la section soit visible)
        const start = windowHeight * 1.3;   // démarre à 130% de la hauteur écran
        const end = windowHeight * 0.5;     // termine à 50% de la hauteur écran

        const raw = (start - rect.top) / (start - end);
        const clamped = Math.min(Math.max(raw, 0), 1);

        setProgress(clamped);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 🎨 Amplitudes réduites pour un effet plus subtil & rapide
  const translateY = (1 - progress) * 40;      // avant : 80 → plus léger
  const opacity = 0.6 + progress * 0.4;         // avant : 0.3 → moins transparent au départ
  const scale = 0.98 + progress * 0.02;         // avant : 0.97 → moins de zoom
  const marginTop = -96 + (1 - progress) * 96;

  return (
    <section
      ref={sectionRef}
      className="relative z-30 overflow-hidden rounded-t-[2.5rem] bg-[#FAFBFD] py-24 shadow-2xl shadow-slate-900/10 will-change-transform"
      style={{
        marginTop: `${marginTop}px`,
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: opacity,
        transition: "transform 0.1s linear, opacity 0.1s linear, margin-top 0.1s linear",
      }}
    >
      {/* Halo décoratif */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: `${BRAND.orange}15` }}
      />

      {/* Poignée visuelle */}
      <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-slate-200" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
            style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
          >
            Le constat
          </span>

          <h2
            className="font-display text-3xl font-semibold leading-tight md:text-4xl"
            style={{ color: BRAND.navy }}
          >
            Vos opportunités sont là.{" "}
            <span style={{ color: BRAND.orange }}>
              Le problème, c'est qu'elles sont partout.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-ink/60">
            Sans veille permanente, la plupart des porteurs de projet sénégalais
            découvrent les bons financements trop tard — ou jamais.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {sources.map(({ icon: Icon, label, desc, color, bg }, i) => (
            <Reveal key={label} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-lg">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-110"
                  style={{ background: bg, color: color }}
                >
                  <Icon size={26} strokeWidth={2} />
                </div>

                <p className="mt-4 text-sm font-semibold" style={{ color: BRAND.navy }}>
                  {label}
                </p>

                <p className="mt-1 text-xs text-slate-500">{desc}</p>

                <div
                  className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: color }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 flex items-center justify-center gap-3">
            <ArrowRight className="hidden sm:block" size={22} style={{ color: BRAND.orange }} />
            <p className="font-display text-xl font-semibold" style={{ color: BRAND.orange }}>
              Gaynaako réunit tout ça en un seul flux, trié pour vous.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}