import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === ""
        ? "L'email est requis"
        : "Email invalide",
  }),

  password: z.string({
    error: "Le mot de passe est requis",
  }).min(6, {
    error: "Le mot de passe doit contenir au moins 6 caractères",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;