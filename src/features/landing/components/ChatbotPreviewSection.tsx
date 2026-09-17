import { Bot, User, Send, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
};

export function ChatbotPreviewSection() {
  return (
    <section
      id="assistant"
      className="relative overflow-hidden bg-[#FAFBFD] py-24"
    >
      {/* Halo décoratif */}
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full blur-[140px]"
        style={{ background: `${BRAND.navy}10` }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full blur-[140px]"
        style={{ background: `${BRAND.orange}12` }}
      />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        
        {/* ===== COLONNE GAUCHE : TEXTE ===== */}
        <Reveal>
          <div>
            {/* Badge */}
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
            >
              Assistant IA
            </span>

            {/* Titre */}
            <h2
              className="font-display text-3xl font-semibold leading-tight md:text-4xl"
              style={{ color: BRAND.navy }}
            >
              Un assistant qui{" "}
              <span style={{ color: BRAND.orange }}>répond</span>, pas qui
              liste.
            </h2>

            {/* Sous-titre */}
            <p className="mt-5 text-base leading-relaxed text-ink/60">
              Plutôt que de parcourir des critères d'éligibilité en petits
              caractères, posez la question directement — le chatbot analyse
              votre profil et vous répond en langage clair.
            </p>

            {/* Points forts */}
            <ul className="mt-6 space-y-3">
              {[
                "Analyse instantanée de votre éligibilité",
                "Recommandations alternatives si vous ne correspondez pas",
                "Disponible 24h/24, en français et en anglais",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
                  >
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink/70">{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#register"
              className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl"
              style={{
                background: BRAND.navy,
                boxShadow: `0 10px 25px -5px ${BRAND.navy}55`,
              }}
            >
              Essayer l'assistant
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>

        {/* ===== COLONNE DROITE : APERÇU DU CHAT ===== */}
        <Reveal delay={150}>
          <div className="relative">
            {/* Halo lumineux derrière la fenêtre */}
            <div
              className="absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl"
              style={{
                background: `linear-gradient(135deg, ${BRAND.navy}22, ${BRAND.orange}22)`,
              }}
            />

            {/* Fenêtre de chat */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              
              {/* En-tête de la fenêtre */}
              <div
                className="flex items-center justify-between border-b border-slate-100 px-4 py-3"
                style={{ background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navy}DD)` }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar bot */}
                  <div className="relative">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.orange}CC)`,
                      }}
                    >
                      <Bot size={18} strokeWidth={2.2} />
                    </div>
                    {/* Pastille "en ligne" */}
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Gaynaako Assistant
                    </p>
                    <p className="flex items-center gap-1.5 text-[10px] text-white/70">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                      En ligne · répond en quelques secondes
                    </p>
                  </div>
                </div>

                {/* Badge IA */}
                <span
                  className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold"
                  style={{ background: `${BRAND.orange}33`, color: "#fff" }}
                >
                  <Sparkles size={10} />
                  IA
                </span>
              </div>

              {/* Corps du chat */}
              <div className="space-y-4 bg-slate-50/50 px-4 py-5">
                
                {/* Message utilisateur */}
                <div className="flex justify-end">
                  <div className="flex max-w-[85%] items-end gap-2">
                    <div
                      className="rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white shadow-sm"
                      style={{ background: BRAND.navy }}
                    >
                      Suis-je éligible au concours Fintech Sénégal ?
                    </div>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                      <User size={14} />
                    </div>
                  </div>
                </div>

                {/* Message assistant */}
                <div className="flex justify-start">
                  <div className="flex max-w-[90%] items-start gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: BRAND.orange }}
                    >
                      <Bot size={14} />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                      <p>
                        Votre profil correspond à{" "}
                        <strong style={{ color: BRAND.orange }}>3 des 4 critères</strong>. Il
                        vous manque une immatriculation de moins de 2 ans.
                      </p>
                      <p className="mt-2 text-slate-600">
                        Voulez-vous voir des programmes similaires{" "}
                        <span className="font-medium">sans cette contrainte</span> ?
                      </p>

                      {/* Suggestions rapides */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          className="rounded-full border px-3 py-1 text-xs font-medium transition hover:bg-slate-50"
                          style={{
                            borderColor: `${BRAND.orange}55`,
                            color: BRAND.orange,
                          }}
                        >
                          Oui, montre-moi
                        </button>
                        <button
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
                        >
                          Comment m'immatriculer ?
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicateur de frappe */}
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: BRAND.orange }}
                    >
                      <Bot size={14} />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone de saisie (factice) */}
              <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-4 py-3">
                <input
                  type="text"
                  disabled
                  placeholder="Posez votre question..."
                  className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-400 outline-none"
                />
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                  style={{ background: BRAND.orange }}
                  aria-label="Envoyer"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Badge flottant "3/4 critères" */}
            <div
              className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold shadow-lg sm:flex"
              style={{ color: BRAND.navy }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                style={{ background: BRAND.orange }}
              >
                <CheckCircle2 size={12} strokeWidth={3} />
              </span>
              3/4 critères validés
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}