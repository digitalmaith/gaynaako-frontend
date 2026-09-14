import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === ""
        ? "L'email est requis"
        : "Email invalide",
  }),
});

export type ForgotPasswordFormValues = z.infer<
  typeof forgotPasswordSchema
>;