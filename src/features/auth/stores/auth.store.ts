// src/features/auth/stores/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "@/features/auth/types/auth.types";

interface AuthStore extends AuthState {
  refreshToken: string | null;

  setAuth: (payload: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;

  setTokens: (payload: {
    accessToken: string;
    refreshToken: string;
  }) => void;

  setUser: (user: User) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: ({ user, accessToken, refreshToken }) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),

      setUser: (user) => set({ user }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "gaynaako-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);