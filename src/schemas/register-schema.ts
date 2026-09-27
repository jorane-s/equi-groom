import { z } from "zod";

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  phone: z
    .string()
    .regex(phoneRegex, {
      error: "Le numéro doit être au format 0644552295 ou +33685452132",
    })
    .optional()
    .or(z.literal("")),
  email: z.email({
    message: "Format d'email invalid. Format: text@adresse.com",
  }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit faire au moins 8 caractères" }),
});

export interface RegisterFormSchema {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  password: string;
}
