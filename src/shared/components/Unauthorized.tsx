import { Link } from "react-router-dom";

export function Unauthorized() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-secondary">Accès non autorisé</h1>
      <p className="text-slate-500">
        Vous n'avez pas les droits nécessaires pour accéder à cette page.
      </p>
      <Link to="/dashboard" className="text-primary underline">
        Retour au tableau de bord
      </Link>
    </div>
  );
}