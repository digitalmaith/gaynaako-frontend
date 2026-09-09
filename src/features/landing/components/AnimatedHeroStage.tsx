import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Paperclip, ArrowUp, Sprout, Landmark, Rocket, HeartHandshake, Plus } from "lucide-react";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";

const templates = [
  { icon: Sprout, label: "Financement agricole" },
  { icon: Landmark, label: "Concours Fintech" },
  { icon: Rocket, label: "Programme d'accélération" },
  { icon: HeartHandshake, label: "Subvention pour ONG" },
];

export function AnimatedHeroStage() {
  const [view, setView] = useState<0 | 1>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setView((v) => (v === 0 ? 1 : 0));
    }, 4800);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="relative mx-auto h-[440px] w-full max-w-2xl md:h-[420px]">
      {/* Vue 1 — Pitch */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
          view === 0 ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light">
          Agent d'opportunités piloté par l'IA
        </span>

        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
          Les opportunités qui vous correspondent,
          <br />
          <span className="text-accent-light">enfin réunies</span> au même endroit.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm text-white/60 md:text-base">
          Financements, subventions et concours dispersés sur des dizaines de
          plateformes — centralisés et analysés pour vous.
        </p>

        <div className="mt-9 flex flex-col items-center gap-2">
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-dark shadow-lg shadow-accent/20 transition hover:bg-white/90"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark text-white">
              <Plus size={13} />
            </span>
            Créer un compte gratuit
            <span aria-hidden>→</span>
          </Link>
          <p className="text-xs text-white/40">Gratuit, sans engagement.</p>
        </div>
      </div>

      {/* Vue 2 — Prompt IA (démonstration du chatbot) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
          view === 1 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <h2 className="text-center font-display text-3xl font-semibold text-white md:text-4xl">
          Quelle opportunité cherchez-vous
          <br />
          aujourd'hui ?
        </h2>

        <div className="mt-8 w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
          <p className="text-sm text-white/40">
            Décrivez votre projet à l'assistant IA…
          </p>
          <div className="mt-8 flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/50">
              <Paperclip size={13} /> Joindre
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-dark">
              <ArrowUp size={15} />
            </span>
          </div>
        </div>

        <div className="mt-5 grid w-full max-w-lg grid-cols-2 gap-2.5">
          {templates.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/60"
            >
              <Icon size={14} className="text-accent-light" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Indicateurs de vue */}
      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              view === i ? "w-6 bg-accent" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}