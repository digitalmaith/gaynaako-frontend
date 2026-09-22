import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building2,
  Send,
  Loader2,
  AlertCircle,
  FileText,
  ListChecks,
  Layers,
  Sparkles,
  CheckCircle2,
  Check,
} from "lucide-react";
import { getStatusStyle } from "../candidatureStatus";
import { useCandidature } from "../hooks/useCandidature";
import { MatchScoreRing } from "@/features/dashboard/components/MatchScoreRing";
import { AssistantChatBox } from "@/features/assistant/components/AssistantChatBox";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
  green: "#10B981", // ✅ Vert pour les étapes complétées
};

export default function CandidatureDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { candidature, loading, error, updateStatut } = useCandidature(id);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await updateStatut("SOUMISE");
    } catch {
      alert("La soumission a échoué. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ===== BOUTON RETOUR ===== */}
      <button
        onClick={() => navigate("/candidatures")}
        className="group flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-800 dark:text-white/50 dark:hover:text-white/80"
      >
        <ArrowLeft
          size={15}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Retour aux candidatures
      </button>

      {loading ? (
        <div className="mt-6 space-y-4">
          <div className="h-48 w-full animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/5" />
          <div className="h-32 w-full animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/5" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="h-64 animate-pulse rounded-2xl bg-slate-200/70 lg:col-span-2 dark:bg-white/5" />
            <div className="h-64 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/5" />
          </div>
        </div>
      ) : error || !candidature ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 py-12 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
            <AlertCircle size={22} className="text-red-500" />
          </div>
          <p className="text-sm font-medium text-red-600 dark:text-red-300">
            {error ?? "Candidature introuvable."}
          </p>
          <button
            onClick={() => navigate("/candidatures")}
            className="mt-2 rounded-full border border-red-200 px-4 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/20"
          >
            Retour à la liste
          </button>
        </div>
      ) : (
        (() => {
          const { opportunite } = candidature;
          const style = getStatusStyle(candidature.statut);
          const Icon = style.icon;

          const statusOrder = ["BROUILLON", "SOUMISE", "EN_COURS", "ACCEPTEE"];
          const currentIndex = statusOrder.indexOf(candidature.statut);

          const steps = [
            {
              label: "Candidature créée",
              date: new Date(candidature.dateCreation).toLocaleDateString("fr-FR"),
              done: currentIndex >= 0,
            },
            {
              label: "Documents vérifiés",
              date: "—",
              done: currentIndex >= 1,
            },
            {
              label: "Candidature soumise",
              date: candidature.dateSoumission
                ? new Date(candidature.dateSoumission).toLocaleDateString("fr-FR")
                : "—",
              done: currentIndex >= 1,
            },
            {
              label: "En cours d'examen",
              date: "—",
              done: currentIndex >= 2,
            },
          ];

          const completedCount = steps.filter((s) => s.done).length;
          const progressPercent =
            steps.length > 1
              ? ((completedCount - 1) / (steps.length - 1)) * 100
              : 0;

          return (
            <>
              {/* ===== EN-TÊTE (adapté mobile) ===== */}
              <div
                className="relative mt-4 overflow-hidden rounded-2xl p-5 text-white sm:p-6 lg:p-8"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.navy} 0%, #2A3A8F 60%, ${BRAND.navy} 100%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: `${BRAND.orange}44` }}
                />
                <div
                  className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl"
                  style={{ background: `${BRAND.orange}22` }}
                />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  {/* Colonne gauche : infos */}
                  <div className="min-w-0 flex-1">
                    {/* Statut */}
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${style.badge}`}
                    >
                      <Icon size={12} strokeWidth={2.2} />
                      {style.label}
                    </span>

                    {/* Titre */}
                    <h1 className="mt-3 break-words font-display text-xl font-semibold leading-tight sm:text-2xl lg:text-3xl">
                      {opportunite.titre}
                    </h1>

                    {/* Méta-infos */}
                    <div className="mt-3 flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:gap-x-5">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="shrink-0" style={{ color: BRAND.orange }} />
                        <span className="truncate">{opportunite.pays}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="shrink-0" style={{ color: BRAND.orange }} />
                        <span className="truncate">
                          Échéance le{" "}
                          {new Date(opportunite.dateLimite).toLocaleDateString("fr-FR")}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Building2 size={14} className="shrink-0" style={{ color: BRAND.orange }} />
                        <span className="truncate">{opportunite.emetteur.nom}</span>
                      </span>
                    </div>

                    {/* CTA soumettre */}
                    {candidature.statut === "BROUILLON" && (
                      <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        style={{
                          background: BRAND.orange,
                          boxShadow: `0 10px 25px -5px ${BRAND.orange}88`,
                        }}
                      >
                        {submitting ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Send
                            size={15}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        )}
                        {submitting ? "Envoi en cours..." : "Soumettre ma candidature"}
                      </button>
                    )}
                  </div>

                  {/* Score de matching — centré sur mobile */}
                  {opportunite.scoreMatching !== null && (
                    <div className="flex shrink-0 justify-center sm:justify-end">
                      <MatchScoreRing score={opportunite.scoreMatching} size={96} />
                    </div>
                  )}
                </div>
              </div>

              {/* ===== PROGRESSION ===== */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
                    >
                      <Sparkles size={15} />
                    </span>
                    <h2 className="font-semibold text-slate-800 dark:text-white">
                      Progression
                    </h2>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-white/50">
                    {completedCount} / {steps.length} étapes
                  </span>
                </div>

                {/* ===== DESKTOP : horizontale ===== */}
                <div className="relative mt-6 hidden sm:block">
                  {/* Ligne de fond */}
                  <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200 dark:bg-white/10" />

                  {/* Ligne de progression — VERTE */}
                  <div
                    className="absolute left-0 top-4 h-0.5 transition-all duration-500"
                    style={{
                      width: `${progressPercent}%`,
                      background: BRAND.green,
                    }}
                  />

                  <div className="relative grid grid-cols-4 gap-2">
                    {steps.map((step, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        {/* Cercle */}
                        <div
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                            step.done
                              ? "border-transparent"
                              : "border-slate-300 bg-white dark:border-white/20 dark:bg-slate-900"
                          }`}
                          style={
                            step.done
                              ? { background: BRAND.green } // ✅ VERT
                              : {}
                          }
                        >
                          {step.done ? (
                            <Check
                              size={16}
                              strokeWidth={3.5}
                              className="text-white"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-slate-400 dark:text-white/40">
                              {i + 1}
                            </span>
                          )}
                        </div>

                        <p
                          className={`mt-2 text-xs font-medium ${
                            step.done
                              ? "text-slate-800 dark:text-white"
                              : "text-slate-400 dark:text-white/40"
                          }`}
                        >
                          {step.label}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400 dark:text-white/40">
                          {step.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ===== MOBILE : verticale ===== */}
                <div className="relative mt-5 sm:hidden">
                  <div className="space-y-4">
                    {steps.map((step, i) => {
                      const isLast = i === steps.length - 1;
                      return (
                        <div key={i} className="relative flex items-start gap-3">
                          {/* Ligne verticale — VERTE si complétée */}
                          {!isLast && (
                            <span
                              className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-0.5 transition-all"
                              style={{
                                background:
                                  step.done && steps[i + 1]?.done
                                    ? BRAND.green
                                    : "var(--step-line, #e2e8f0)",
                              }}
                            />
                          )}

                          {/* Cercle */}
                          <div
                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                              step.done
                                ? "border-transparent"
                                : "border-slate-300 bg-white dark:border-white/20 dark:bg-slate-900"
                            }`}
                            style={
                              step.done
                                ? { background: BRAND.green } // ✅ VERT
                                : {}
                            }
                          >
                            {step.done ? (
                              <Check
                                size={16}
                                strokeWidth={3.5}
                                className="text-white"
                              />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-slate-400 dark:text-white/40">
                                {i + 1}
                              </span>
                            )}
                          </div>

                          {/* Contenu */}
                          <div className="flex-1 pb-1 pt-1">
                            <p
                              className={`text-sm font-medium ${
                                step.done
                                  ? "text-slate-800 dark:text-white"
                                  : "text-slate-400 dark:text-white/40"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400 dark:text-white/40">
                              {step.date}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ===== CONTENU + PANNEAU IA ===== */}
              <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="space-y-5 lg:col-span-2">
                  <SectionCard
                    icon={FileText}
                    iconColor="#0EA5E9"
                    iconBg="#E0F2FE"
                    title="Description de l'opportunité"
                  >
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-white/60">
                      {opportunite.description}
                    </p>
                  </SectionCard>

                  <SectionCard
                    icon={ListChecks}
                    iconColor="#F59E0B"
                    iconBg="#FEF3C7"
                    title="Critères d'éligibilité"
                  >
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-white/60">
                      {opportunite.criteresEligibilite}
                    </p>
                  </SectionCard>

                  <SectionCard
                    icon={Layers}
                    iconColor="#10B981"
                    iconBg="#D1FAE5"
                    title="Détails"
                  >
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <DetailItem label="Secteur" value={opportunite.secteur.nom} />
                      <DetailItem label="Type" value={opportunite.type} />
                      <DetailItem
                        label="Candidature créée"
                        value={new Date(candidature.dateCreation).toLocaleDateString("fr-FR")}
                      />
                      {candidature.dateSoumission && (
                        <DetailItem
                          label="Soumise le"
                          value={new Date(candidature.dateSoumission).toLocaleDateString("fr-FR")}
                          highlight
                        />
                      )}
                    </div>
                  </SectionCard>
                </div>

                {/* COLONNE DROITE — ASSISTANT IA */}
                <div className="lg:sticky lg:top-24 lg:h-fit">
                  <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#EEF0FA] to-[#FDF0E6] p-4 dark:border-white/10 dark:from-[#1E2B7A]/30 dark:to-[#E87722]/20">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.orange})`,
                        }}
                      >
                        <Sparkles size={15} />
                      </div>
                      <p className="text-sm font-semibold text-[#1E2B7A] dark:text-white">
                        Assistant IA
                      </p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-white/70">
                      Posez vos questions sur cette candidature sans quitter la page.
                      L'IA connaît votre profil et cette opportunité.
                    </p>
                  </div>

                  <div className="mt-3">
                    <AssistantChatBox
                      context={{
                        candidatureId: candidature.id,
                        opportuniteId: opportunite.id,
                      }}
                      placeholder="Une question sur cette candidature ?"
                      suggestions={[
                        "Pourquoi cette opportunité me correspond ?",
                        "Quels documents dois-je vérifier avant de soumettre ?",
                      ]}
                    />
                  </div>

                  <div className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-white/10 dark:text-white/50">
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: BRAND.orange }}
                    />
                    <span>
                      Astuce : demandez à l'IA de <strong>résumer les critères</strong> en 3 points clés.
                    </span>
                  </div>
                </div>
              </div>
            </>
          );
        })()
      )}
    </>
  );
}

/* ============================================
   SOUS-COMPOSANTS
============================================ */

function SectionCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  children,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: iconBg, color: iconColor }}
        >
          <Icon size={15} />
        </span>
        <h2 className="font-semibold text-slate-800 dark:text-white">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-slate-400 dark:text-white/40">{label}</p>
      <p
        className={`mt-0.5 text-sm font-semibold ${
          highlight
            ? "text-slate-800 dark:text-white"
            : "text-slate-700 dark:text-white/80"
        }`}
      >
        {value}
      </p>
    </div>
  );
}