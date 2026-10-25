import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Veuillez entrer votre adresse mail" }),
  password: z
    .string()
    .min(1, { message: "Veuillez entrer votre mot de passe" }),
});

export type LoginFormModel = z.infer<typeof loginSchema>;
