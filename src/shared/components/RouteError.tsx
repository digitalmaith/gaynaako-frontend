import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export function RouteError() {
  const error = useRouteError();

  let title = "Une erreur est survenue";
  let message = "Quelque chose s'est mal passé. Réessaie plus tard.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message ?? message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground max-w-md">{message}</p>

      <div className="flex gap-2">
        <button
          onClick={() => window.location.reload()}
          className="rounded-md border px-4 py-2"
        >
          Recharger
        </button>
        <Link to="/" className="rounded-md bg-primary px-4 py-2 text-white">
          Retour à l'accueil
        </Link>
      </div>

      {import.meta.env.DEV && error instanceof Error && (
        <pre className="mt-4 max-w-2xl overflow-auto rounded bg-gray-100 p-4 text-left text-xs">
          {error.stack}
        </pre>
      )}
    </div>
  );
}