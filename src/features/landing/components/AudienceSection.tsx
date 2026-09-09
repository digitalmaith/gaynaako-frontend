import { Users, Building2, HeartHandshake } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

const audiences = [
  {
    icon: Users,
    title: "Entrepreneurs",
    needs: ["Financements et concours adaptés à votre profil", "Score d'éligibilité instantané", "Alertes avant chaque échéance"],
  },
  {
    icon: Building2,
    title: "PME",
    needs: ["Appels d'offres nationaux et internationaux", "Suivi de plusieurs candidatures", "Statistiques d'opportunités consultées"],
  },
  {
    icon: HeartHandshake,
    title: "ONG & Associations",
    needs: ["Subventions et bailleurs de fonds ciblés", "Recommandations selon votre mission", "Candidatures préparées avec l'IA"],
  },
];

export function AudienceSection() {
  return (
    <section id="pour-qui" className="bg-paper py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-primary">
            Pensé pour chaque type de structure
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {audiences.map(({ icon: Icon, title, needs }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                <Icon className="text-accent" size={28} />
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{title}</h3>
                <ul className="mt-4 space-y-2">
                  {needs.map((need) => (
                    <li key={need} className="text-sm text-ink/60">— {need}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}