import { Reveal } from "@/shared/components/Reveal";

export function ChatbotPreviewSection() {
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-primary">
            Un assistant qui répond, pas qui liste.
          </h2>
          <p className="mt-4 text-ink/60">
            Plutôt que de parcourir des critères d'éligibilité en petits caractères,
            posez la question directement — le chatbot analyse votre profil et vous
            répond en langage clair.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-2xl border border-slate-200 bg-primary-dark p-5 shadow-xl">
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-accent px-4 py-2.5 text-sm text-primary-dark">
                Suis-je éligible au concours Fintech Sénégal ?
              </div>
            </div>
            <div className="mt-3 flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-sm text-white/90">
                Votre profil correspond à 3 des 4 critères. Il vous manque une
                immatriculation de moins de 2 ans. Voulez-vous voir des programmes
                similaires sans cette contrainte ?
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}