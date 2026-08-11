import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import type { Role } from "@/features/auth/types/auth.types";

interface RoleGuardProps {
  allowedRoles: Role[];
}

/**
 * Vérifie que le rôle de l'utilisateur connecté fait partie des rôles autorisés.
 * À utiliser DANS une route déjà protégée par ProtectedRoute.
 */
export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const user = useAuthStore((state) => state.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}