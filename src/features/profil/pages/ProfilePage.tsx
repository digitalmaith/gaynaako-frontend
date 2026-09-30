// src/features/profil/pages/ProfilePage.tsx
import { AlertCircle } from "lucide-react";
import { ProfileHeader } from "../components/ProfileHeader";
import { EditPmeProfileForm } from "../components/EditPmeProfileForm";
import { useProfile } from "../hooks/useProfile";
import { Role } from "@/features/auth/types/auth.types";

export default function ProfilePage() {
  const { user, loading, error, saving, refetch, updatePmeProfile } = useProfile();

  // ─── Rendu conditionnel extrait (fix SonarQube S3358) ───
  const renderContent = () => {
    if (loading) {
      return (
        <div className="mt-6 space-y-5">
          <div className="h-24 w-full animate-pulse rounded-xl bg-slate-200/70 dark:bg-white/5" />
          <div className="h-64 w-full animate-pulse rounded-xl bg-slate-200/70 dark:bg-white/5" />
        </div>
      );
    }

    if (error || !user) {
      return (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 py-10 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <AlertCircle size={22} className="text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      );
    }

    return (
      <div className="mt-6 space-y-5">
        <ProfileHeader user={user} />

        {user.role === Role.PME && (
          <EditPmeProfileForm
            user={user}
            saving={saving}
            onSubmit={updatePmeProfile}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-slate-800 dark:text-white">
        Mon profil
      </h1>

      {renderContent()}
    </div>
  );
}