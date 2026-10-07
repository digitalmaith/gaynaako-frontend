// src/features/opportunities/components/OpportunityStats.tsx
import { MapPin, Building2, TrendingUp, AlertCircle } from 'lucide-react';
import type { OpportunityIaStats } from '../types/opportunity-ia';

interface OpportunityStatsProps {
  stats: OpportunityIaStats;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: 'primary' | 'emerald' | 'orange' | 'blue';
}

export function OpportunityStats({ stats }: OpportunityStatsProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Total" value={stats.total} icon={TrendingUp} color="primary" />
      <StatCard
        label="Haute qualité"
        value={stats.highQuality}
        icon={AlertCircle}
        color="emerald"
      />
      <StatCard label="Pays" value={stats.countries} icon={MapPin} color="orange" />
      <StatCard label="Sources" value={stats.sources} icon={Building2} color="blue" />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    primary:
      'bg-[#1E2B7A]/10 text-[#1E2B7A] dark:bg-[#1E2B7A]/20 dark:text-[#4A5AA8]',
    emerald:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    orange: 'bg-orange-50 text-[#E87722] dark:bg-orange-500/10',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  }[color];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
      <div
        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${colorClasses}`}
      >
        <Icon size={16} />
      </div>
      <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-white/50">{label}</p>
    </div>
  );
}