import { z } from "zod";
import { Role } from "@/features/auth/types/auth.types";

export const registerSchema = z
  .object({
    role: z.enum([Role.ENTREPRENEUR, Role.PME, Role.ONG]),

    email: z.string().min(1, "L'email est requis").email("Email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
    confirmPassword: z.string().min(1, "Confirmez le mot de passe"),

    // --- Entrepreneur ---
    secteurId: z.string().optional(),
    paysId: z.string().optional(),
    domaineExpertise: z.string().optional(),
    objectifs: z.string().optional(),

    // --- PME ---
    nomEntreprise: z.string().optional(),
    secteurIds: z.array(z.string()).optional(),

    // --- ONG ---
    nomOrganisation: z.string().optional(),
    domainesInterventionIds: z.array(z.string()).optional(), // ⚠️ pluriel, cohérent avec OngProfile.domainesIntervention
    mission: z.string().optional(),

    logo: z.instanceof(File).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }

    if (data.role === Role.ENTREPRENEUR) {
      if (!data.secteurId) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Secteur d'activité requis", path: ["secteurId"] });
      }
      if (!data.paysId) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Pays requis", path: ["paysId"] });
      }
      if (!data.domaineExpertise) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Domaine d'expertise requis", path: ["domaineExpertise"] });
      }
    }

    if (data.role === Role.PME) {
      if (!data.nomEntreprise) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nom de l'entreprise requis", path: ["nomEntreprise"] });
      }
      if (!data.secteurIds || data.secteurIds.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Au moins un secteur d'activité requis",
          path: ["secteurIds"],
        });
      }
    }

    if (data.role === Role.ONG) {
      if (!data.nomOrganisation) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nom de l'organisation requis", path: ["nomOrganisation"] });
      }
      if (!data.domainesInterventionIds || data.domainesInterventionIds.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Au moins un domaine d'intervention requis",
          path: ["domainesInterventionIds"],
        });
      }
    }
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const stepFields: Record<number, (keyof RegisterFormValues)[]> = {
  0: ["role"],
  1: ["email", "password", "confirmPassword"],
  2: [],
  3: [],
};