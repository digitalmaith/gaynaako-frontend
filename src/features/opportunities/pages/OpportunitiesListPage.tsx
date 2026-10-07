// src/features/opportunities/pages/OpportunitiesListPage.tsx
import { Search, AlertCircle } from 'lucide-react';
import { useOpportunitiesIa } from '../hooks/useOpportunitiesIa';
import { OpportunityCard } from '../components/OpportunityCard';
import { OpportunitySkeleton } from '../components/OpportunitySkeleton';
import { OpportunityStats } from '../components/OpportunityStats';
import { OpportunityFilters } from '../components/OpportunityFilters';
import { OpportunityPagination } from '../components/OpportunityPagination';

// 🎯 Configuration
const PAGE_SIZE = 12;

export default function OpportunitiesListPage() {
  // ⚙️ Hook : toute la logique de fetch + filtres
  const {
    opportunities,
    stats,
    countries,
    loading,
    error,
    totalPages,
    total,
    search,
    country,
    minQuality,
    page,
    hasFilters,
    handleSearchChange,
    handleCountryChange,
    handleQualityChange,
    handlePageChange,
    resetFilters,
  } = useOpportunitiesIa();

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Opportunités collectées
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
          {stats
            ? `${stats.total} opportunités collectées automatiquement par notre IA`
            : 'Chargement...'}
        </p>
      </div>

      {/* ===== STATS ===== */}
      {stats && <OpportunityStats stats={stats} />}

      {/* ===== FILTRES ===== */}
      <OpportunityFilters
        search={search}
        country={country}
        minQuality={minQuality}
        countries={countries}
        hasFilters={hasFilters}
        onSearchChange={handleSearchChange}
        onCountryChange={handleCountryChange}
        onQualityChange={handleQualityChange}
        onReset={resetFilters}
      />

      {/* ===== ERREUR ===== */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* ===== LISTE ===== */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(PAGE_SIZE)].map((_, i) => (
            <OpportunitySkeleton key={i} />
          ))}
        </div>
      ) : opportunities.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-white/10 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5">
            <Search size={24} className="text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-700 dark:text-white">
            Aucune opportunité trouvée
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-white/50">
            {hasFilters
              ? 'Essayez de modifier vos filtres'
              : 'Les opportunités apparaîtront ici après la prochaine collecte'}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-lg bg-[#1E2B7A] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>

          <OpportunityPagination
            page={page}
            totalPages={totalPages}
            total={total}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}