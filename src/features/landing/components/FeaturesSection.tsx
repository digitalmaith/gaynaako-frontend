import { Search, Sparkles, MessageSquareText, LayoutDashboard, BellRing, ShieldCheck } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

const features = [
  { icon: Search, title: "Recherche avancée", description: "Filtrez par secteur, pays, date limite et niveau d'expérience." },
  { icon: Sparkles, title: "Score de pertinence", description: "Chaque opportunité est notée selon votre profil réel." },
  { icon: MessageSquareText, title: "Assistant conversationnel", description: "Posez vos questions en langage naturel, à toute heure." },
  { icon: LayoutDashboard, title: "Tableau de bord", description: "Favoris, brouillons et suivi de candidatures au même endroit." },
  { icon: BellRing, title: "Alertes intelligentes", description: "Par email ou WhatsApp, avant chaque date limite." },
  { icon: ShieldCheck, title: "Données sécurisées", description: "Chiffrement et conformité RGPD dès la conception." },
];

export function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-primary">
            Tout ce qu'il faut, rien de superflu
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="rounded-xl border border-slate-200 p-5 transition hover:border-accent/40 hover:shadow-sm">
                <Icon className="text-accent" size={22} />
                <h3 className="mt-3 font-display text-sm font-semibold text-primary">{title}</h3>
                <p className="mt-1.5 text-sm text-ink/60">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}