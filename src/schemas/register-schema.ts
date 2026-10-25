import { z } from "zod";

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

// Règles partagées entre la validation et la checklist affichée sous le champ
export const PASSWORD_RULES = [
  { label: "8 caractères minimum", test: (value: string) => value.length >= 8 },
  { label: "Une majuscule", test: (value: string) => /[A-Z]/.test(value) },
  { label: "Une minuscule", test: (value: string) => /[a-z]/.test(value) },
  { label: "Un chiffre", test: (value: string) => /\d/.test(value) },
];

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().trim().min(1, { message: "Le nom est requis" }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, {
      error: "Le numéro doit être au format 0644552295 ou +33685452132",
    })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(
      z.email({
        message: "Format d'email invalide. Format : texte@adresse.com",
      }),
    ),
  password: z
    .string()
    .refine((value) => PASSWORD_RULES.every((rule) => rule.test(value)), {
      message: "Le mot de passe ne respecte pas toutes les règles",
    }),
  acceptTerms: z.boolean().refine((value) => value, {
    message: "Vous devez accepter les CGU pour créer votre compte",
  }),
});

export type RegisterFormModel = z.infer<typeof registerSchema>;
