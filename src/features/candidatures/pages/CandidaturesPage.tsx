// src/features/candidatures/pages/CandidaturesPage.tsx
import { useMemo, useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { CandidatureRow, CandidatureRowSkeleton } from "../components/CandidatureRow";
import { Pagination } from "../components/Pagination";
import { candidatureStatusStyles } from "../candidatureStatus";
import { useCandidatures } from "../hooks/useCandidatures";
import type { CandidatureStatut } from "../types";

type FilterKey = "tous" | CandidatureStatut;

const filters: { key: FilterKey; label: string }[] = [
  { key: "tous", label: "Tous" },
  ...(Object.keys(candidatureStatusStyles) as CandidatureStatut[]).map((key) => ({
    key,
    label: candidatureStatusStyles[key].label,
  })),
];

export default function CandidaturesPage() {
  const { candidatures, meta, page, loading, error, refetch, goToPage } = useCandidatures();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("tous");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return candidatures.filter((c) => {
      const matchesFilter = activeFilter === "tous" || c.statut === activeFilter;
      const matchesSearch = c.opportunite.titre.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [candidatures, activeFilter, search]);

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-display text-2xl font-semibold text-slate-800 dark:text-white">
          Mes candidatures
        </h1>
        <p className="mt-1 text-sm text-slate-400 dark:text-white/40">
          Suivez l'état de vos candidatures aux opportunités.
        </p>
      </div>

      {error ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 py-10 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <AlertCircle size={22} className="text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={refetch}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? "bg-primary/5 text-primary dark:bg-white/10 dark:text-white"
                    : "text-slate-500 hover:bg-slate-50 dark:text-white/40 dark:hover:bg-white/5"
                }`}
              >
                {filter.label}
              </button>
            ))}

            <div className="relative ml-auto w-full max-w-xs">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une candidature..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30"
              />
            </div>
          </div>

          <div className="mt-2 rounded-xl border border-slate-200 px-4 dark:border-white/10">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <CandidatureRowSkeleton key={i} />)
            ) : filtered.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-400 dark:text-white/40">
                Aucune candidature ne correspond à ce filtre.
              </p>
            ) : (
              filtered.map((c) => <CandidatureRow key={c.id} candidature={c} />)
            )}
          </div>

          {meta && <Pagination page={page} totalPages={meta.totalPages} onChange={goToPage} />}
        </>
      )}
    </DashboardLayout>
  );
}