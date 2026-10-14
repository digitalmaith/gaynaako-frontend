import { Target, FileText, Heart, Bookmark, Users, Briefcase, TrendingUp } from 'lucide-react';
import type { Statistiques, Role } from '../../types';

interface StatsSectionProps {
  stats: Statistiques;
  role: Role;
}

export function StatsSection({ stats, role }: StatsSectionProps) {
  const cards = [
    {
      label: 'Recommandations',
      value: stats.recommandations,
      icon: Target,
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      label: 'Candidatures',
      value: stats.candidatures,
      icon: FileText,
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50 dark:bg-purple-500/10',
    },
    {
      label: 'Favoris',
      value: stats.favoris,
      icon: Heart,
      gradient: 'from-rose-500 to-red-500',
      bg: 'bg-rose-50 dark:bg-rose-500/10',
    },
    {
      label: 'Documents',
      value: stats.documents,
      icon: Bookmark,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
    },
  ];

  if (role === 'ADMINISTRATEUR') {
    cards.push(
      {
        label: 'Opportunités gérées',
        value: stats.opportunitesGerees ?? 0,
        icon: Briefcase,
        gradient: 'from-emerald-500 to-teal-500',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      },
      {
        label: 'Utilisateurs',
        value: stats.utilisateursGeres ?? 0,
        icon: Users,
        gradient: 'from-cyan-500 to-blue-500',
        bg: 'bg-cyan-50 dark:bg-cyan-500/10',
      },
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/40">
      <div className="flex items-center gap-2">
        <TrendingUp size={18} className="text-accent" />
        <h2 className="font-display text-lg font-semibold text-slate-800 dark:text-white">
          Statistiques
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`group relative overflow-hidden rounded-xl ${c.bg} p-4 transition-transform hover:scale-[1.02]`}
          >
            <div
              className={`absolute -top-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-br ${c.gradient} opacity-20 blur-2xl`}
            />
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} shadow-md`}
            >
              <c.icon size={18} className="text-white" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{c.value}</p>
            <p className="text-xs font-medium text-slate-500 dark:text-white/50">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}