// src/features/admin/pages/AdminUsersPage.tsx
import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/shared/components/Toast";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { useUsers } from "../hooks/useUsers";
import { UsersFilters } from "../components/UsersFilters";
import { UsersTable } from "../components/UsersTable";
import { UsersGrid } from "../components/UsersGrid";
import { UsersPagination } from "../components/UsersPagination";
import { UserDetailDrawer } from "../components/UserDetailDrawer";
import { UsersViewToggle, type ViewMode } from "../components/UsersViewToggle";
import type { AdminUser, UserRole, UserStatut } from "../api/users.api";

type PendingAction =
  | { type: "delete"; user: AdminUser }
  | { type: "restore"; user: AdminUser }
  | { type: "statut"; user: AdminUser; statut: UserStatut }
  | null;

const STATUT_LABELS: Record<UserStatut, string> = {
  ACTIF: "Actif",
  EN_ATTENTE: "En attente",
  SUSPENDU: "Suspendu",
  INACTIF: "Inactif",
};

export default function AdminUsersPage() {
  const toast = useToast();
  const {
    items,
    meta,
    loading,
    error,
    params,
    setParams,
    refetch,
    remove,
    restore,
    changeStatut,
  } = useUsers();

  // Filtres
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [statutFilter, setStatutFilter] = useState<UserStatut | "">("");

  // Vue
  const [view, setView] = useState<ViewMode>("table");

  // UI
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((u) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        u.email.toLowerCase().includes(q) ||
        u.nom.toLowerCase().includes(q) ||
        u.prenom.toLowerCase().includes(q) ||
        u.pme?.nomEntreprise.toLowerCase().includes(q);

      const matchesRole = !roleFilter || u.role === roleFilter;
      const matchesStatut = !statutFilter || u.statut === statutFilter;

      return matchesSearch && matchesRole && matchesStatut;
    });
  }, [items, search, roleFilter, statutFilter]);

  // ─── Ouverture des dialogues ───
  const askDelete = (user: AdminUser) =>
    setPendingAction({ type: "delete", user });
  const askRestore = (user: AdminUser) =>
    setPendingAction({ type: "restore", user });
  const askStatut = (user: AdminUser, statut: UserStatut) =>
    setPendingAction({ type: "statut", user, statut });

  // ─── Confirmation ───
  const handleConfirm = async () => {
    if (!pendingAction) return;
    setActionLoading(true);

    try {
      switch (pendingAction.type) {
        case "delete":
          await remove(pendingAction.user.id);
          toast.success(
            `${pendingAction.user.prenom} ${pendingAction.user.nom} a été supprimé.`
          );
          break;

        case "restore":
          await restore(pendingAction.user.id);
          toast.success(
            `${pendingAction.user.prenom} ${pendingAction.user.nom} a été restauré.`
          );
          break;

        case "statut":
          await changeStatut(pendingAction.user.id, pendingAction.statut);
          toast.success(
            `Statut changé : ${STATUT_LABELS[pendingAction.statut]}.`
          );
          break;
      }
      setPendingAction(null);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Une erreur est survenue."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const dialogConfig = useMemo(() => {
    if (!pendingAction) return null;
    const { user } = pendingAction;
    const fullName = `${user.prenom} ${user.nom}`;

    switch (pendingAction.type) {
      case "delete":
        return {
          title: "Supprimer cet utilisateur ?",
          description: `${fullName} (${user.email}) sera marqué comme supprimé. Vous pourrez le restaurer plus tard.`,
          confirmLabel: "Supprimer",
          variant: "danger" as const,
          loadingLabel: "Suppression...",
        };

      case "restore":
        return {
          title: "Restaurer cet utilisateur ?",
          description: `${fullName} (${user.email}) sera de nouveau actif sur la plateforme.`,
          confirmLabel: "Restaurer",
          variant: "success" as const,
          loadingLabel: "Restauration...",
        };

      case "statut":
        return {
          title: "Changer le statut ?",
          description: `Le statut de ${fullName} passera de « ${STATUT_LABELS[user.statut]} » à « ${STATUT_LABELS[pendingAction.statut]} ».`,
          confirmLabel: "Confirmer",
          variant:
            pendingAction.statut === "SUSPENDU"
              ? ("warning" as const)
              : ("info" as const),
          loadingLabel: "Traitement...",
        };
    }
  }, [pendingAction]);

  return (
    <div className="space-y-5">
      {/* EN-TÊTE */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-primary dark:text-white">
            Utilisateurs
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
            {meta?.total ?? items.length} utilisateur
            {(meta?.total ?? items.length) > 1 ? "s" : ""} sur la plateforme
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <UsersViewToggle view={view} onChange={setView} />

          <label className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs dark:border-white/10 dark:bg-white/5">
            <input
              type="checkbox"
              checked={params.inclureSupprimes ?? false}
              onChange={(e) =>
                setParams((p) => ({
                  ...p,
                  inclureSupprimes: e.target.checked,
                  page: 1,
                }))
              }
              className="h-3.5 w-3.5 accent-accent"
            />
            <span className="font-medium text-slate-600 dark:text-white/70">
              Inclure les supprimés
            </span>
          </label>
        </div>
      </header>

      {/* FILTRES */}
      <UsersFilters
        search={search}
        role={roleFilter}
        statut={statutFilter}
        onSearchChange={setSearch}
        onRoleChange={setRoleFilter}
        onStatutChange={setStatutFilter}
        onReset={() => {
          setSearch("");
          setRoleFilter("");
          setStatutFilter("");
        }}
      />

      {/* ERREUR */}
      {error && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 py-8 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <AlertCircle size={22} className="text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={refetch}
            className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* LISTE */}
      {!error && (
        <>
          {view === "table" ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
              <UsersTable
                items={filtered}
                loading={loading}
                onView={setSelectedUser}
                onDelete={askDelete}
                onRestore={askRestore}
                onStatut={askStatut}
              />

              {meta && (
                <UsersPagination
                  page={meta.page}
                  totalPages={meta.totalPages}
                  total={meta.total}
                  onPageChange={(page) =>
                    setParams((p) => ({ ...p, page }))
                  }
                />
              )}
            </div>
          ) : (
            <>
              <UsersGrid
                items={filtered}
                loading={loading}
                onView={setSelectedUser}
                onDelete={askDelete}
                onRestore={askRestore}
                onStatut={askStatut}
              />

              {meta && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
                  <UsersPagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    total={meta.total}
                    onPageChange={(page) =>
                      setParams((p) => ({ ...p, page }))
                    }
                  />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* DIALOGUE */}
      {dialogConfig && (
        <ConfirmDialog
          open
          title={dialogConfig.title}
          description={dialogConfig.description}
          confirmLabel={dialogConfig.confirmLabel}
          variant={dialogConfig.variant}
          isLoading={actionLoading}
          loadingLabel={dialogConfig.loadingLabel}
          onConfirm={handleConfirm}
          onClose={() => setPendingAction(null)}
        />
      )}

      {/* DRAWER */}
      {selectedUser && (
        <UserDetailDrawer
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}