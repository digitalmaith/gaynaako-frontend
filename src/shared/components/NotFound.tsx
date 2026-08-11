import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-secondary">404</h1>
      <p className="text-slate-500">Page introuvable.</p>
      <Link to="/" className="text-primary underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}