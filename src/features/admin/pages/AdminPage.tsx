import { Link } from "react-router-dom";
import {
  Users,
  TrendingUp,
  ChevronDown,
  Check,
  MoreHorizontal,
  Plus,
  FileText,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  Cell,
} from "recharts";
import { Skeleton } from "@/shared/components/Skeleton";
import { useAdminOverview } from "../hooks/useAdminOverview";

// ─────────────────────────────────────────────
// Mock data (uniquement ce qui n'a pas d'API)
// ─────────────────────────────────────────────
const TREND_DATA = [
  { x: 1, y: 20 }, { x: 2, y: 45 }, { x: 3, y: 30 },
  { x: 4, y: 55 }, { x: 5, y: 48 }, { x: 6, y: 70 },
  { x: 7, y: 65 }, { x: 8, y: 85 }, { x: 9, y: 78 },
  { x: 10, y: 95 },
];

const ACTIVITY_LOG = [
  { id: 1, time: "Jeudi 12h", title: "Nouveau match IA", desc: "Fonds PNUD à 94%", done: true },
  { id: 2, time: "Dimanche 15h", title: "Candidature soumise", desc: "Startup Africa 2026", done: true },
  { id: 3, time: "Lundi 14h45", title: "Document expiré", desc: "Attestation fiscale à renouveler", done: false },
];

// ─────────────────────────────────────────────
// Constantes visuelles
// ─────────────────────────────────────────────
const ROLE_LABELS: Record<string, string> = {
  ENTREPRENEUR: "Entrep.",
  PME: "PME",
  ONG: "ONG",
  ADMINISTRATEUR: "Admin",
};

const ROLE_COLORS: Record<string, string> = {
  ENTREPRENEUR: "#3B82F6",
  PME: "#F26A1B",
  ONG: "#10B981",
  ADMINISTRATEUR: "#8B5CF6",
};

const STATUS_LABELS: Record<string, string> = {
  BROUILLON: "Brouillon",
  SOUMISE: "Soumise",
  EN_COURS: "En cours",
  ACCEPTEE: "Acceptée",
  REJETEE: "Rejetée",
};

const STATUS_COLORS: Record<string, string> = {
  BROUILLON: "#94A3B8",
  SOUMISE: "#3B82F6",
  EN_COURS: "#F59E0B",
  ACCEPTEE: "#10B981",
  REJETEE: "#EF4444",
};

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function AdminPage() {
  const { data, loading, error } = useAdminOverview();

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 py-12 text-center">
        <p className="text-sm font-medium text-red-600 dark:text-red-300">
          {error}
        </p>
      </div>
    );
  }

  // ─── Données dérivées ───
  const roleData = data
    ? Object.entries(data.utilisateurs.parRole).map(([role, count]) => ({
        label: ROLE_LABELS[role] ?? role,
        count,
        fill: ROLE_COLORS[role] ?? "#94A3B8",
      }))
    : [];

  const statusData = data
    ? Object.entries(data.candidatures.parStatut).map(([status, count]) => ({
        label: STATUS_LABELS[status] ?? status,
        count,
        fill: STATUS_COLORS[status] ?? "#94A3B8",
      }))
    : [];

  return (
    <div className="space-y-5 text-slate-900 dark:text-white">
      {/* ═══════════ LIGNE 1 : Balance + Activité + Base de données ═══════════ */}
      <section className="grid gap-5 lg:grid-cols-3">
        {/* ─── Total utilisateurs (avec gauge) ─── */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Total utilisateurs
            </p>
            <button className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10">
              Ce mois
              <ChevronDown size={11} />
            </button>
          </div>

          {loading || !data ? (
            <Skeleton className="mt-4 h-32 w-full rounded-xl" />
          ) : (
            <>
              <p className="mt-2 font-display text-4xl font-bold tracking-tight">
                {data.utilisateurs.total.toLocaleString("fr-FR")}
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
                {data.utilisateurs.nouveauxDerniers30Jours} nouveaux ce mois
              </p>

              {/* Gauge SVG */}
              <div className="relative mt-4 flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full max-w-60">
                  <path
                    d="M 20 90 A 80 80 0 0 1 180 90"
                    fill="none"
                    stroke="currentColor"
                    className="text-slate-200 dark:text-white/5"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 90 A 80 80 0 0 1 120 25"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 120 25 A 80 80 0 0 1 180 90"
                    fill="none"
                    stroke="#F26A1B"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 text-center">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">
                    {data.utilisateurs.nouveauxDerniers7Jours > 0
                      ? `+${data.utilisateurs.nouveauxDerniers7Jours} cette semaine`
                      : "Stable"}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-white/40">
                    Dernière mise à jour : aujourd'hui
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ─── Activité (bar chart par rôle) ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Répartition par rôle
            </p>
            <p className="text-xs text-slate-400 dark:text-white/40">
              {data?.utilisateurs.total ?? 0} utilisateurs
            </p>
          </div>

          {loading || !data ? (
            <Skeleton className="mt-4 h-40 w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={roleData}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                barGap={4}
              >
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "currentColor" }}
                  className="text-slate-400 dark:text-white/30"
                />
                <Tooltip
                  cursor={{ fill: "rgba(148,163,184,0.1)" }}
                  contentStyle={{
                    background: "var(--tooltip-bg)",
                    border: "1px solid var(--tooltip-border)",
                    borderRadius: 8,
                    color: "var(--tooltip-color)",
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {roleData.map((entry) => (
                    <Cell key={entry.label} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-white/40">
              Actifs
            </span>
            <span className="font-semibold text-accent">
              {data?.utilisateurs.parStatut.ACTIF ?? 0} / {data?.utilisateurs.total ?? 0}
            </span>
          </div>
        </div>

        {/* ─── Base de données (stats) ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Base de données
            </p>
            <Link
              to="/app/admin/opportunites"
              className="text-xs text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white"
            >
              Voir tout
            </Link>
          </div>

          {loading || !data ? (
            <div className="mt-4 space-y-3">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <FileText size={13} className="text-slate-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-white/70">
                    Opportunités scrapées
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  {data.opportunites.total}
                </span>
              </li>

              <li className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-accent" />
                  <span className="text-xs font-medium text-slate-600 dark:text-white/70">
                    Recommandations IA
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  {data.recommandations.total}
                </span>
              </li>

              <li className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Zap size={13} className="text-slate-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-white/70">
                    Émetteurs
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  {data.emetteurs.total}
                </span>
              </li>

              <li className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Heart size={13} className="text-rose-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-white/70">
                    Favoris
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  {data.favoris.total}
                </span>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* ═══════════ LIGNE 2 : Analytics candidatures + More ═══════════ */}
      <section className="grid gap-5 lg:grid-cols-5">
        {/* ─── Candidatures par statut ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3 dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Candidatures par statut
            </p>
            <Link
              to="/app/admin/candidatures"
              className="text-xs text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white"
            >
              Voir tout
            </Link>
          </div>

          <div className="mt-4">
            {loading || !data ? (
              <Skeleton className="h-40 w-full rounded-xl" />
            ) : statusData.length === 0 ? (
              <div className="flex h-40 items-center justify-center">
                <p className="text-xs text-slate-400 dark:text-white/40">
                  Aucune candidature
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={statusData}
                  barGap={2}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "currentColor" }}
                    className="text-slate-400 dark:text-white/30"
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.1)" }}
                    contentStyle={{
                      background: "var(--tooltip-bg)",
                      border: "1px solid var(--tooltip-border)",
                      borderRadius: 8,
                      color: "var(--tooltip-color)",
                      fontSize: 11,
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {statusData.map((entry) => (
                      <Cell key={entry.label} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-white/40">
              <span className="font-bold text-slate-800 dark:text-white">
                {data?.candidatures.total ?? 0}
              </span>{" "}
              candidatures au total
            </span>
          </div>
        </div>

        {/* ─── Plus (mini stats) ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Plus
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/60">
              <Users size={12} />
              <span className="font-semibold text-slate-800 dark:text-white">
                {data?.candidatures.total ?? 0}
              </span>
              <span className="text-slate-400 dark:text-white/40">
                Candidatures
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/50">
              <TrendingUp size={12} className="text-accent" />
              <span>Dernière mise à jour : aujourd'hui</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-700 dark:text-white/70">
                  Créer un utilisateur
                </p>
                <Link
                  to="/app/admin/users"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20"
                >
                  <Plus size={12} />
                </Link>
              </div>
              <p className="mt-1 text-[10px] text-slate-400 dark:text-white/40">
                Invitez un nouveau membre sur la plateforme
              </p>
            </div>

            {/* Top rôle */}
            {data && roleData.length > 0 && (
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/2">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${roleData[0].fill}, #F26A1B)`,
                  }}
                >
                  {roleData[0].label.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-800 dark:text-white">
                    {roleData[0].label}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-white/40">
                    Rôle le plus représenté
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">
                    {roleData[0].count}
                  </p>
                  <p className="text-[10px] text-accent">
                    sur {data.utilisateurs.total}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ LIGNE 3 : Activité + Timeline ═══════════ */}
      <section className="grid gap-5 lg:grid-cols-3">
        {/* ─── Recommandations IA ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Recommandations IA
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-white/40">
                Générées par le moteur de matching
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-bold text-white">
              <Sparkles size={16} />
            </div>
          </div>

          <div className="relative mt-5">
            <p className="text-center font-display text-3xl font-bold text-slate-900 dark:text-white">
              {data?.recommandations.total ?? 0}
            </p>
            <p className="mt-1 text-center text-xs text-slate-400 dark:text-white/50">
              recommandations au total
            </p>

            <div className="mt-4">
              {loading ? (
                <Skeleton className="h-24 w-full rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={TREND_DATA}>
                    <defs>
                      <linearGradient id="curve" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="y"
                      stroke="#3B82F6"
                      strokeWidth={2.5}
                      fill="url(#curve)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-100 p-3 text-center dark:border-white/5">
              <p className="text-lg font-bold text-slate-800 dark:text-white">
                {data?.opportunites.total ?? 0}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-white/40">
                Opportunités
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 p-3 text-center dark:border-white/5">
              <p className="text-lg font-bold text-slate-800 dark:text-white">
                {data?.candidatures.total ?? 0}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-white/40">
                Candidatures
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 p-3 text-center dark:border-white/5">
              <p className="text-lg font-bold text-slate-800 dark:text-white">
                {data?.favoris.total ?? 0}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-white/40">
                Favoris
              </p>
            </div>
          </div>
        </div>

        {/* ─── Timeline Mises à jour (mock) ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Mises à jour
            </p>
            <button className="text-xs text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white">
              Détails
            </button>
          </div>

          <ul className="mt-5 space-y-4">
            {ACTIVITY_LOG.map((item, i) => (
              <li key={item.id} className="relative flex gap-3">
                {i < ACTIVITY_LOG.length - 1 && (
                  <div className="absolute left-2.25 top-6 h-full w-px bg-slate-200 dark:bg-white/10" />
                )}

                <div
                  className={`relative z-10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    item.done
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-white/30"
                  }`}
                >
                  {item.done ? (
                    <Check size={10} strokeWidth={3} />
                  ) : (
                    <MoreHorizontal size={10} />
                  )}
                </div>

                <div className="min-w-0 flex-1 pb-1">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-white/40">
                    {item.time}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/50">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button className="mt-6 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-primary dark:hover:bg-white/90">
            Voir tous les logs
          </button>
        </div>
      </section>
    </div>
  );
}