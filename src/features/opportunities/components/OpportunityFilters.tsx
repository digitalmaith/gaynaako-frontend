// src/features/opportunities/components/OpportunityFilters.tsx
import { Search, Filter } from 'lucide-react';
import type { OpportunityIaCountry } from '../types/opportunity-ia';

interface OpportunityFiltersProps {
  search: string;
  country: string;
  minQuality: number;
  countries: OpportunityIaCountry[];
  hasFilters: boolean;
  onSearchChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onQualityChange: (value: number) => void;
  onReset: () => void;
}

export function OpportunityFilters({
  search,
  country,
  minQuality,
  countries,
  hasFilters,
  onSearchChange,
  onCountryChange,
  onQualityChange,
  onReset,
}: OpportunityFiltersProps) {
  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Recherche */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher une opportunité..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-[#1E2B7A] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>

        {/* Pays */}
        <div className="relative">
          <Filter
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm outline-none transition focus:border-[#1E2B7A] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <option value="">Tous les pays</option>
            {countries.map((c) => (
              <option key={c.country} value={c.country}>
                {c.country} ({c.count})
              </option>
            ))}
          </select>
        </div>

        {/* Qualité */}
        <select
          value={minQuality}
          onChange={(e) => onQualityChange(Number(e.target.value))}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-[#1E2B7A] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <option value={0}>Toute qualité</option>
          <option value={50}>≥ 50</option>
          <option value={70}>≥ 70</option>
          <option value={80}>≥ 80</option>
          <option value={90}>≥ 90</option>
        </select>

        {/* Reset */}
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/5"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}