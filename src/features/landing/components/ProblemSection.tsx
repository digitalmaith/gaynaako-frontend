import { Globe, Share2, Building } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

const sources = [
  { icon: Globe, label: "Sites web institutionnels" },
  { icon: Share2, label: "Réseaux sociaux" },
  { icon: Building, label: "Portails gouvernementaux" },
];

export function ProblemSection() {
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-primary">
            Vos opportunités sont là. Le problème, c'est qu'elles sont partout.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/60">
            Sans veille permanente, la plupart des porteurs de projet découvrent
            les bonnes opportunités trop tard — ou jamais.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {sources.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 100}>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <Icon className="mx-auto text-slate-300" size={28} />
                <p className="mt-3 text-sm font-medium text-ink/70">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-10 font-display text-xl font-semibold text-accent-dark">
            → Gaynaako réunit tout ça en un seul flux, trié pour vous.
          </p>
        </Reveal>
      </div>
    </section>
  );
}