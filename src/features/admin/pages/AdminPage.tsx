import { Link } from "react-router-dom";
import {
  Users,
  TrendingUp,
  ChevronDown,
  Check,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import { Skeleton } from "@/shared/components/Skeleton";
import { useAdminOverview } from "../hooks/useAdminOverview";

// ─────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────
const WEEKLY_BARS = [
  { day: "L", a: 40, b: 20 },
  { day: "M", a: 55, b: 30 },
  { day: "M", a: 30, b: 15 },
  { day: "J", a: 70, b: 35 },
  { day: "V", a: 45, b: 25 },
  { day: "S", a: 60, b: 30 },
  { day: "D", a: 35, b: 18 },
];

const TREND_DATA = [
  { x: 1, y: 20 }, { x: 2, y: 45 }, { x: 3, y: 30 },
  { x: 4, y: 55 }, { x: 5, y: 48 }, { x: 6, y: 70 },
  { x: 7, y: 65 }, { x: 8, y: 85 }, { x: 9, y: 78 },
  { x: 10, y: 95 },
];

const RECENT_USERS = [
  { nom: "Aminata Diop", email: "aminata@example.com", role: "PME", delta: "+12%", positive: true },
  { nom: "Ousmane Ba", email: "ousmane@example.com", role: "PME", delta: "-3%", positive: false },
  { nom: "Fatou Ndiaye", email: "fatou@example.com", role: "PME", delta: "+8%", positive: true },
  { nom: "Admin Gaynaako", email: "admin@gaynaako.test", role: "ADMIN", delta: "+2%", positive: true },
];

const ACTIVITY_LOG = [
  { id: 1, time: "Jeudi 12h", title: "Nouveau match IA", desc: "Fonds PNUD à 94%", done: true },
  { id: 2, time: "Dimanche 15h", title: "Candidature soumise", desc: "Startup Africa 2026", done: true },
  { id: 3, time: "Lundi 14h45", title: "Document expiré", desc: "Attestation fiscale à renouveler", done: false },
];


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

  return (
    <div className="space-y-5 text-slate-900 dark:text-white">
      {/* ═══════════ LIGNE 1 : Balance + Report + Transactions ═══════════ */}
      <section className="grid gap-5 lg:grid-cols-3">
        {/* ─── Balance (avec gauge) ─── */}
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
                    Croissance modérée
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-white/40">
                    Dernière mise à jour : aujourd'hui
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ─── Report (bar chart vertical) ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Activité
            </p>
            <p className="text-xs text-slate-400 dark:text-white/40">
              7 derniers jours
            </p>
          </div>

          {loading ? (
            <Skeleton className="mt-4 h-40 w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={WEEKLY_BARS}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                barGap={4}
              >
                <XAxis
                  dataKey="day"
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
                <Bar dataKey="a" radius={[6, 6, 0, 0]} fill="#F26A1B" />
                <Bar dataKey="b" radius={[6, 6, 0, 0]} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          )}

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-white/40">
              Cette semaine
            </span>
            <span className="font-semibold text-accent">+350 / 640</span>
          </div>
        </div>

        {/* ─── Transactions (liste) ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Opportunités
            </p>
            <Link
              to="/app/admin/users"
              className="text-xs text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white"
            >
              Voir tout (4)
            </Link>
          </div>

          <ul className="mt-4 space-y-1">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <li key={i}>
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </li>
                ))
              : RECENT_USERS.slice(0, 3).map((u) => (
                  <li
                    key={u.email}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-xs font-bold text-white">
                      {u.nom.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-slate-800 dark:text-white">
                        {u.nom}
                      </p>
                      <p className="truncate text-[10px] text-slate-400 dark:text-white/40">
                        Inscrit aujourd'hui
                      </p>
                    </div>
                    <p
                      className={`text-xs font-semibold ${
                        u.positive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {u.delta}
                    </p>
                  </li>
                ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ LIGNE 2 : Overview Analytics ═══════════ */}
      <section className="grid gap-5 lg:grid-cols-5">
        {/* ─── Carte avec bar chart multicolore + ligne ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3 dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Analytics des candidatures
            </p>
            <button className="text-xs text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white">
              Plus
            </button>
          </div>

          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-40 w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={WEEKLY_BARS}
                  barGap={2}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <Bar dataKey="a" radius={[4, 4, 0, 0]} fill="#F26A1B" />
                  <Bar dataKey="b" radius={[4, 4, 0, 0]} fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="-mt-8">
            {loading ? (
              <Skeleton className="h-20 w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height={80}>
                <AreaChart
                  data={TREND_DATA}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F26A1B" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#F26A1B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke="#F26A1B"
                    strokeWidth={2}
                    fill="url(#trend)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-white/40">
              <span className="font-bold text-slate-800 dark:text-white">
                610.5
              </span>{" "}
              candidatures moyennes / mois
            </span>
          </div>
        </div>

        {/* ─── Carte "More" (mini stats) ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-white/60">
              Plus
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/60">
              <Users size={12} />
              <span className="font-semibold text-slate-800 dark:text-white">
                45
              </span>
              <span className="text-slate-400 dark:text-white/40">
                Candidatures
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/50">
              <TrendingUp size={12} className="text-accent" />
              <span>3 déc. 2025 · Dernière activité</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-700 dark:text-white/70">
                  Créer un utilisateur
                </p>
                <button className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20">
                  <Plus size={12} />
                </button>
              </div>
              <p className="mt-1 text-[10px] text-slate-400 dark:text-white/40">
                Invitez un nouveau membre sur la plateforme
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-bold text-white">
                N
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-800 dark:text-white">
                  Nolan Geidt
                </p>
                <p className="text-[10px] text-slate-400 dark:text-white/40">
                  nolan@gaynaako.test
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800 dark:text-white">
                  204.360
                </p>
                <p className="text-[10px] text-accent">+193.45</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ LIGNE 3 : Recent Sent + Timeline ═══════════ */}
      <section className="grid gap-5 lg:grid-cols-3">
        {/* ─── Recent Sent (courbe) ─── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 dark:border-white/5 dark:bg-white/2 dark:shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Activité récente
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-white/40">
                Bonne journée !
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-bold text-white">
              A
            </div>
          </div>

          <div className="mt-4 flex gap-1 overflow-x-auto">
            {["22", "23", "24", "25 · Lun", "26", "27", "28"].map((d, i) => (
              <button
                key={d}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-xs transition ${
                  i === 3
                    ? "bg-slate-200 font-semibold text-slate-900 dark:bg-white/10 dark:text-white"
                    : "text-slate-400 hover:bg-slate-100 dark:text-white/40 dark:hover:bg-white/5"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="relative mt-5">
            <p className="text-center font-display text-2xl font-bold text-slate-900 dark:text-white">
              1200{" "}
              <span className="text-sm text-slate-400 dark:text-white/50">
                USD
              </span>
            </p>
            <div className="mt-2">
              {loading ? (
                <Skeleton className="h-24 w-full rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={TREND_DATA}>
                    <defs>
                      <linearGradient id="curve" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
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
        </div>

        {/* ─── Timeline Updates ─── */}
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