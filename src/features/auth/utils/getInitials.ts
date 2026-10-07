// src/features/auth/utils/getInitials.ts
export function getInitials(prenom?: string, nom?: string, fallbackTitle?: string): string {
  const first = prenom?.trim().charAt(0) ?? "";
  const last = nom?.trim().charAt(0) ?? "";
  const initials = `${first}${last}`.toUpperCase();
  if (initials) return initials;
  return fallbackTitle?.trim().charAt(0).toUpperCase() ?? "U";
}