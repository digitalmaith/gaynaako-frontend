import { Role, type User } from "@/features/auth/types/auth.types";

export interface AccountDisplay {
  title: string;
  subtitle: string | null;
  logoUrl: string | null;
}

export function getAccountDisplay(user: User | null): AccountDisplay {
  if (!user) {
    return { title: "Mon compte", subtitle: null, logoUrl: null };
  }

  const fullName = `${user.prenom} ${user.nom}`;

  if (user.role === Role.PME && user.pme) {
    return {
      title: user.pme.nomEntreprise,
      subtitle: fullName,
      logoUrl: user.pme.logoUrl,
    };
  }

  if (user.role === Role.ONG && user.ong) {
    return {
      title: user.ong.nomOrganisation,
      subtitle: fullName,
      logoUrl: user.ong.logoUrl,
    };
  }

  return { title: fullName, subtitle: null, logoUrl: null };
}