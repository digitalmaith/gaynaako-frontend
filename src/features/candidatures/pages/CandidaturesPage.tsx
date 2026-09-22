import { useMemo, useState } from "react";
import {
  Search,
  AlertCircle,
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Filter,
} from "lucide-react";
import { CandidatureRow, CandidatureRowSkeleton } from "../components/CandidatureRow";
import { Pagination } from "../components/Pagination";
import { candidatureStatusStyles } from "../candidatureStatus";
import { useCandidatures } from "../hooks/useCandidatures";
import type { CandidatureStatut } from "../types";

type FilterKey = "tous" | CandidatureStatut;

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
  green: "#10B981",
  red: "#EF4444",
  amber: "#F59E0B",
};

const filters: { key: FilterKey; label: string }[] = [
  { key: "tous", label: "Tous" },
  ...(Object.keys(candidatureStatusStyles) as CandidatureStatut[]).map((key) => ({
    key,
    label: candidatureStatusStyles[key].label,
  })),
];

// 🎯 Icônes par statut (pour les stats en haut)
const statusIcons: Record<string, React.ElementType> = {
  BROUILLON: ClipboardList,
  SOUMISE: Clock,
  EN_COURS: TrendingUp,
  ACCEPTEE: CheckCircle2,
  REFUSEE: XCircle,
};

export default function CandidaturesPage() {
  const { candidatures, meta, page, loading, error, refetch, goToPage } = useCandidatures();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("tous");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return candidatures.filter((c) => {
      const matchesFilter = activeFilter === "tous" || c.statut === activeFilter;
      const matchesSearch = c.opportunite.titre
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [candidatures, activeFilter, search]);

  // 📊 Statistiques par statut
  const stats = useMemo(() => {
    const byStatus: Record<string, number> = {};
    candidatures.forEach((c) => {
      byStatus[c.statut] = (byStatus[c.statut] || 0) + 1;
    });
    return byStatus;
  }, [candidatures]);

  const totalCount = candidatures.length;

  // Compteur pour chaque filtre
  const getFilterCount = (key: FilterKey) => {
    if (key === "tous") return totalCount;
    return stats[key] || 0;
  };

  return (
    <>
      {/* ===== EN-TÊTE ===== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-slate-800 dark:text-white">
            Mes candidatures
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
            Suivez l'état de vos candidatures aux opportunités en un coup d'œil.
          </p>
        </div>

        {/* Stats rapides */}
        {!loading && totalCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(stats).map(([statut, count]) => {
              const style = candidatureStatusStyles[statut as CandidatureStatut];
              const StatusIcon = statusIcons[statut] || ClipboardList;
              if (!style) return null;
              return (
                <div
                  key={statut}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs dark:border-white/10 dark:bg-white/5"
                >
                  <StatusIcon size={12} style={{ color: BRAND.navy }} />
                  <span className="font-semibold text-slate-700 dark:text-white">
                    {count}
                  </span>
                  <span className="text-slate-500 dark:text-white/50">
                    {style.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 py-12 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
            <AlertCircle size={22} className="text-red-500" />
          </div>
          <p className="text-sm font-medium text-red-600 dark:text-red-300">
            {error}
          </p>
          <button
            onClick={refetch}
            className="mt-2 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
          {/* ===== FILTRES + RECHERCHE ===== */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Filtres */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                  <Filter size={11} />
                  Filtres
                </span>
                {filters.map((filter) => {
                  const count = getFilterCount(filter.key);
                  const isActive = activeFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        isActive
                          ? "text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                      }`}
                      style={
                        isActive
                          ? {
                              background: BRAND.navy,
                              boxShadow: `0 4px 12px -2px ${BRAND.navy}55`,
                            }
                          : {}
                      }
                    >
                      {filter.label}
                      <span
                        className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/50"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Recherche */}
              <div className="relative w-full lg:max-w-xs">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher une candidature..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:bg-white focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:bg-white/10"
                  style={{ "--tw-ring-color": `${BRAND.orange}55` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>

          {/* ===== LISTE ===== */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <CandidatureRowSkeleton key={i} />
              ))
            ) : filtered.length === 0 ? (
              /* État vide */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
                >
                  <ClipboardList size={26} />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-white">
                  Aucune candidature trouvée
                </p>
                <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-white/50">
                  {search
                    ? `Aucun résultat pour « ${search} ». Essayez un autre mot-clé.`
                    : "Commencez par explorer les opportunités qui vous correspondent."}
                </p>
                {!search && (
                  <a
                    href="/dashboard"
                    className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
                    style={{
                      background: BRAND.orange,
                      boxShadow: `0 10px 25px -5px ${BRAND.orange}66`,
                    }}
                  >
                    Explorer les opportunités
                  </a>
                )}
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {filtered.map((c) => (
                  <CandidatureRow key={c.id} candidature={c} />
                ))}
              </div>
            )}
          </div>

          {/* Compteur de résultats */}
          {!loading && filtered.length > 0 && (
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 dark:text-white/40">
              <span>
                {filtered.length} candidature{filtered.length > 1 ? "s" : ""}
                {activeFilter !== "tous" && ` · filtre : ${filters.find((f) => f.key === activeFilter)?.label}`}
              </span>
              {meta && (
                <span>
                  Page {page} sur {meta.totalPages}
                </span>
              )}
            </div>
          )}

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-4">
              <Pagination page={page} totalPages={meta.totalPages} onChange={goToPage} />
            </div>
          )}
        </>
      )}
    </>
  );
}