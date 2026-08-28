import { z } from "zod";

import { Role } from "@/features/auth/types/auth.types";


const addIssue = (
  ctx: z.RefinementCtx,
  path: keyof RegisterFormValues,
  message: string
) => {
  ctx.addIssue({
    code: "custom",
    message,
    path: [path],
  });
};

const validateEntrepreneur = (
  data: RegisterFormValues,
  ctx: z.RefinementCtx
) => {
  if (!data.secteurId) {
    addIssue(ctx, "secteurId", "Secteur d'activité requis");
  }

  if (!data.paysId) {
    addIssue(ctx, "paysId", "Pays requis");
  }

  if (!data.domaineExpertise) {
    addIssue(
      ctx,
      "domaineExpertise",
      "Domaine d'expertise requis"
    );
  }
};

const validatePME = (
  data: RegisterFormValues,
  ctx: z.RefinementCtx
) => {
  if (!data.nomEntreprise) {
    addIssue(
      ctx,
      "nomEntreprise",
      "Nom de l'entreprise requis"
    );
  }

  if (!data.secteurIds?.length) {
    addIssue(
      ctx,
      "secteurIds",
      "Au moins un secteur d'activité requis"
    );
  }
};

const validateONG = (
  data: RegisterFormValues,
  ctx: z.RefinementCtx
) => {
  if (!data.nomOrganisation) {
    addIssue(
      ctx,
      "nomOrganisation",
      "Nom de l'organisation requis"
    );
  }

  if (!data.domainesInterventionIds?.length) {
    addIssue(
      ctx,
      "domainesInterventionIds",
      "Au moins un domaine d'intervention requis"
    );
  }
};

export const registerSchema = z
  .object({
    role: z.enum([
      Role.ENTREPRENEUR,
      Role.PME,
      Role.ONG,
    ]),

    email: z.email({
      error: (issue) =>
        issue.input === ""
          ? "L'email est requis"
          : "Email invalide",
    }),

    password: z
      .string()
      .min(6, "Minimum 6 caractères"),

    confirmPassword: z
      .string()
      .min(1, "Confirmez le mot de passe"),

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
    domainesInterventionIds: z.array(z.string()).optional(),
    mission: z.string().optional(),

    logo: z.instanceof(File).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      addIssue(
        ctx,
        "confirmPassword",
        "Les mots de passe ne correspondent pas"
      );
    }

    const validators = {
      [Role.ENTREPRENEUR]: validateEntrepreneur,
      [Role.PME]: validatePME,
      [Role.ONG]: validateONG,
    };

    validators[data.role]?.(data, ctx);
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const stepFields: Record<
  number,
  (keyof RegisterFormValues)[]
> = {
  0: ["role"],
  1: ["email", "password", "confirmPassword"],
  2: [],
  3: [],
};