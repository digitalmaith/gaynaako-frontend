import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";

/**
 * Empêche un utilisateur déjà connecté d'accéder à /login ou /register.
 */
export function GuestGuard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}   