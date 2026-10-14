import { useState } from 'react';
import { AlertCircle, User as UserIcon, FileText, CreditCard } from 'lucide-react';
import { ProfileHeader } from '../components/ProfileHeader';
import { StatsSection } from '../components/sections/StatsSection';
import { EditIdentityForm } from '../components/sections/EditIdentityForm';
import { EditEntrepreneurForm } from '../components/EditEntrepreneurForm';
import { EditPmeProfileForm } from '../components/EditPmeProfileForm';
import { EditOngProfileForm } from '../components/EditOngProfileForm';
import { DocumentsSection } from '../components/sections/DocumentsSection';
import { SubscriptionSection } from '../components/sections/SubscriptionSection';
import { useProfile } from '../hooks/useProfile';
import { Role } from '../types';

type Tab = 'profil' | 'documents' | 'abonnement';

export default function ProfilePage() {
  const {
    user,
    loading,
    error,
    saving,
    refetch,
    updateIdentity,
    updateEntrepreneurProfile,
    updatePmeProfile,
    updateOngProfile,
    uploadAvatar,
    uploadLogo,
  } = useProfile();

  const [tab, setTab] = useState<Tab>('profil');

  // ─── Loading ───
  if (loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 p-6">
        <div className="h-40 w-full animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/5" />
        <div className="h-96 w-full animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/5" />
      </div>
    );
  }

  // ─── Erreur ───
  if (error || !user) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-200 bg-red-50 py-16 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <AlertCircle size={28} className="text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === Role.ADMIN;

  const tabs: { id: Tab; label: string; icon: typeof UserIcon }[] = [
    { id: 'profil', label: 'Profil', icon: UserIcon },
    ...(!isAdmin
      ? [
          { id: 'documents' as Tab, label: 'Documents', icon: FileText },
          { id: 'abonnement' as Tab, label: 'Abonnement', icon: CreditCard },
        ]
      : []),
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Header de page */}
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
          Mon profil
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      {/* Carte profil */}
      <ProfileHeader user={user} saving={saving} onAvatarChange={uploadAvatar} />

      {/* Onglets */}
      <div className="flex gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-slate-900/40">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                active
                  ? 'bg-accent text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50 dark:text-white/50 dark:hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Contenu */}
      <div className="space-y-6">
        {tab === 'profil' && (
          <>
            <EditIdentityForm user={user} saving={saving} onSubmit={updateIdentity} />

            {user.role === Role.ENTREPRENEUR && user.entrepreneur && (
              <EditEntrepreneurForm
                user={user}
                saving={saving}
                onSubmit={updateEntrepreneurProfile}
                onUploadLogo={uploadLogo}
              />
            )}

            {user.role === Role.PME && user.pme && (
              <EditPmeProfileForm
                user={user}
                saving={saving}
                onSubmit={updatePmeProfile}
                onUploadLogo={uploadLogo}
              />
            )}

            {user.role === Role.ONG && user.ong && (
              <EditOngProfileForm
                user={user}
                saving={saving}
                onSubmit={updateOngProfile}
                onUploadLogo={uploadLogo}
              />
            )}

            <StatsSection stats={user.statistiques} role={user.role} />
          </>
        )}

        {tab === 'documents' && <DocumentsSection documents={user.documents} />}

        {tab === 'abonnement' && <SubscriptionSection abonnement={user.abonnement} />}
      </div>
    </div>
  );
}