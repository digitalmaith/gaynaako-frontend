// src/features/opportunities/hooks/useOpportunitiesIa.ts
import { useCallback, useEffect, useState } from 'react';
import { opportunitiesIaService } from '../services/opportunities-ia.service';
import type {
  OpportunityIa,
  OpportunityIaStats,
  OpportunityIaCountry,
} from '../types/opportunity-ia';

const PAGE_SIZE = 12;

export function useOpportunitiesIa() {
  // 📊 Données
  const [opportunities, setOpportunities] = useState<OpportunityIa[]>([]);
  const [stats, setStats] = useState<OpportunityIaStats | null>(null);
  const [countries, setCountries] = useState<OpportunityIaCountry[]>([]);

  // 🎛️ Filtres
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [minQuality, setMinQuality] = useState(0);
  const [page, setPage] = useState(1);

  // 📈 État
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  // ⚙️ Chargement
  const loadData = useCallback(async () => {
    try {
      const [listRes, statsRes, countriesRes] = await Promise.all([
        opportunitiesIaService.list({
          page,
          limit: PAGE_SIZE,
          search: search || undefined,
          country: country || undefined,
          minQuality: minQuality > 0 ? minQuality : undefined,
        }),
        opportunitiesIaService.stats(),
        opportunitiesIaService.countries(),
      ]);

      setOpportunities(listRes.items);
      setTotalPages(listRes.meta.totalPages);
      setTotal(listRes.meta.total);
      setStats(statsRes);
      setCountries(countriesRes);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(`Impossible de charger les opportunités : ${msg}`);
      console.error('[useOpportunitiesIa] Erreur:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, country, minQuality]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // 🎯 Actions
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setPage(1);
  };

  const handleQualityChange = (value: number) => {
    setMinQuality(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const resetFilters = () => {
    setSearch('');
    setCountry('');
    setMinQuality(0);
    setPage(1);
  };

  const hasFilters = search !== '' || country !== '' || minQuality > 0;

  return {
    // Données
    opportunities,
    stats,
    countries,
    // État
    loading,
    error,
    totalPages,
    total,
    // Filtres actuels
    search,
    country,
    minQuality,
    page,
    hasFilters,
    // Actions
    handleSearchChange,
    handleCountryChange,
    handleQualityChange,
    handlePageChange,
    resetFilters,
  };
}