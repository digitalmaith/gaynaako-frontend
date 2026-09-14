import { useAuthStore } from "@/app/store/auth.store";
import { Role } from "@/features/auth/types/auth.types";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold text-primary">Mon profil</h1>

      <div className="mt-6 space-y-1 text-slate-600">
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role}</p>
        <p><strong>Statut :</strong> {user.statut}</p>
        <p>
          <strong>Membre depuis :</strong>{" "}
          {new Date(user.dateCreation).toLocaleDateString("fr-FR")}
        </p>
      </div>

      {user.role === Role.ENTREPRENEUR && user.entrepreneur && (
        <div className="mt-6 rounded-xl border border-slate-200 p-4">
          <h2 className="mb-3 font-semibold text-primary">Profil entrepreneur</h2>
          <p><strong>Secteur :</strong> {user.entrepreneur.secteur.nom}</p>
          <p><strong>Pays :</strong> {user.entrepreneur.pays.nom}</p>
          <p><strong>Domaine d'expertise :</strong> {user.entrepreneur.domaineExpertise}</p>
          {user.entrepreneur.objectifs && (
            <p><strong>Objectifs :</strong> {user.entrepreneur.objectifs}</p>
          )}
        </div>
      )}

      {user.role === Role.PME && user.pme && (
        <div className="mt-6 rounded-xl border border-slate-200 p-4">
          <h2 className="mb-3 font-semibold text-primary">Profil entreprise</h2>
          <p><strong>Nom :</strong> {user.pme.nomEntreprise}</p>
          <p><strong>Secteurs :</strong> {user.pme.secteurs.map((s) => s.nom).join(", ")}</p>
        </div>
      )}

      {user.role === Role.ONG && user.ong && (
        <div className="mt-6 rounded-xl border border-slate-200 p-4">
          <h2 className="mb-3 font-semibold text-primary">Profil organisation</h2>
          <p><strong>Nom :</strong> {user.ong.nomOrganisation}</p>
          <p>
            <strong>Domaines d'intervention :</strong>{" "}
            {user.ong.domainesIntervention.map((d) => d.nom).join(", ")}
          </p>
          {user.ong.mission && <p><strong>Mission :</strong> {user.ong.mission}</p>}
        </div>
      )}
    </div>
  );
}