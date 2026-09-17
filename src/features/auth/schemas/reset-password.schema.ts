import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    code: z.string().min(1, "Le code est requis"),
    newPassword: z.string().min(6, "Minimum 6 caractères"),
    confirmPassword: z.string().min(1, "Confirmez le mot de passe"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;