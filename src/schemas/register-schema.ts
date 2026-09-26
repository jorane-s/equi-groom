import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .regex(emailRegex, { message: "Format d'email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit faire au moins 8 caractères" }),
});
