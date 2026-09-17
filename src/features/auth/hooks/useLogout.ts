import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import { api } from "@/shared/services/api"; // adapte le chemin selon ton projet

export function useLogout() {
  const navigate = useNavigate();
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const logout = useAuthStore((s) => s.logout);
  const [isLoading, setIsLoading] = useState(false);

  const performLogout = async () => {
    setIsLoading(true);
    try {
      // Appel API (on ignore les erreurs : on veut déconnecter côté client quoi qu'il arrive)
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch (err) {
      console.warn("Logout API error (ignorée):", err);
    } finally {
      // Nettoyage local systématique
      logout();
      setIsLoading(false);
      navigate("/login", { replace: true });
    }
  };

  return { performLogout, isLoading };
}