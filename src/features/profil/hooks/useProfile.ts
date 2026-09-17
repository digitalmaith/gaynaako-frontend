// src/features/profil/hooks/useProfile.ts
import { useCallback, useEffect, useState } from "react";
import { profileService } from "../services/profile.service";
import { useAuthStore } from "@/app/store/authStore";
import type { UpdatePmeProfilePayload, User } from "../types";

export function useProfile() {
  const setUser = useAuthStore((state) => state.setUser);
  const [user, setLocalUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await profileService.getMe();
      setLocalUser(data);
      setUser(data); // synchronise le store global (topbar, sidebar...)
    } catch {
      setError("Impossible de charger votre profil pour le moment.");
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchProfile();
    });
  }, [fetchProfile]);

  const updatePmeProfile = async (payload: UpdatePmeProfilePayload) => {
    setSaving(true);
    try {
      const updated = await profileService.updatePmeProfile(payload);
      setLocalUser(updated);
      setUser(updated);
    } finally {
      setSaving(false);
    }
  };

  return { user, loading, error, saving, refetch: fetchProfile, updatePmeProfile };
}