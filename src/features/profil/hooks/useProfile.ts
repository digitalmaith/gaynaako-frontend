import { useCallback, useEffect, useState } from 'react';
import { profileService } from '../services/profile.service';
import { useAuthStore } from '@/app/store/authStore';
import type {
  UpdateIdentityPayload,
  UpdatePmeProfilePayload,
  UpdateEntrepreneurProfilePayload,
  UpdateOngProfilePayload,
  User,
} from '../types';

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
      setUser(data);
    } catch {
      setError('Impossible de charger votre profil pour le moment.');
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchProfile();
    });
  }, [fetchProfile]);

  const applyUpdate = async (fn: () => Promise<User>) => {
    setSaving(true);
    try {
      const updated = await fn();
      setLocalUser(updated);
      setUser(updated);
    } finally {
      setSaving(false);
    }
  };

  return {
    user,
    loading,
    error,
    saving,
    refetch: fetchProfile,
    updateIdentity: (payload: UpdateIdentityPayload) =>
      applyUpdate(() => profileService.updateIdentity(payload)),
    updateEntrepreneurProfile: (payload: UpdateEntrepreneurProfilePayload) =>
      applyUpdate(() => profileService.updateEntrepreneurProfile(payload)),
    updatePmeProfile: (payload: UpdatePmeProfilePayload) =>
      applyUpdate(() => profileService.updatePmeProfile(payload)),
    updateOngProfile: (payload: UpdateOngProfilePayload) =>
      applyUpdate(() => profileService.updateOngProfile(payload)),
    uploadAvatar: (file: File) => applyUpdate(() => profileService.uploadAvatar(file)),
    uploadLogo: (file: File) => applyUpdate(() => profileService.uploadLogo(file)),
  };
}