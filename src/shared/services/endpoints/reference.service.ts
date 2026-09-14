import { api } from "@/shared/services/api";
import type { Secteur, Pays, DomaineIntervention } from "@/shared/types/reference.types";

export const referenceService = {
  getSecteurs: async (): Promise<Secteur[]> => {
    const { data } = await api.get<Secteur[]>("/reference/secteurs");
    console.log("secteurs data:", data); // Log the data to the console
    return data;
  },

  getPays: async (): Promise<Pays[]> => {
    const { data } = await api.get<Pays[]>("/reference/pays");
    return data;
  },

  getDomainesIntervention: async (): Promise<DomaineIntervention[]> => {
    const { data } = await api.get<DomaineIntervention[]>("/reference/domaines-intervention");
    return data;
  },
};