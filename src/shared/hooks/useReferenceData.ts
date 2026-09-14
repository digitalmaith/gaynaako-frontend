import { useQuery } from "@tanstack/react-query";
import { referenceService } from "@/shared/services/endpoints/reference.service";

export function useSecteurs() {
  return useQuery({
    queryKey: ["secteurs"],
    queryFn: referenceService.getSecteurs,
    staleTime: 5 * 60 * 1000, // 5 min — données référentielles peu volatiles
  });
}

export function usePays() {
  return useQuery({
    queryKey: ["pays"],
    queryFn: referenceService.getPays,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDomainesIntervention() {
  return useQuery({
    queryKey: ["domaines-intervention"],
    queryFn: referenceService.getDomainesIntervention,
    staleTime: 5 * 60 * 1000,
  });
}