import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import { Role } from "@/features/auth/types/auth.types";

export function RoleBasedRedirect() {
  const role = useAuthStore((state) => state.user?.role);

  if (role === Role.ADMIN) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}