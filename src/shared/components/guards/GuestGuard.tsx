import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/app/store/authStore";
import { Role } from "@/features/auth/types/auth.types";

/**
 * Empêche un utilisateur déjà connecté d'accéder
 * aux pages réservées aux visiteurs (/login, /register, etc.).
 */
export function GuestGuard() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const role = useAuthStore(
    (state) => state.user?.role
  );

  if (isAuthenticated) {
    if (role === Role.ADMIN) {
      return <Navigate to="/app/admin" replace />;
    }

    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}
