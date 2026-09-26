import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Veuillez entrez votre adresse mail" }),
  password: z
    .string()
    .min(1, { message: "Veuillez entrer votre mot de passe" }),
});

export interface LoginFormModel {
  email: string;
  password: string;
}
