export const Role = {
  ENTREPRENEUR: "ENTREPRENEUR",
  PME: "PME",
  ONG: "ONG",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}