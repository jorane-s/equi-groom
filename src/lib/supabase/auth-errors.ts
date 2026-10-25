import { AuthError, isAuthRetryableFetchError } from "@supabase/supabase-js";

const DEFAULT_MESSAGE = "Une erreur est survenue. Veuillez réessayer.";

const AUTH_ERROR_MESSAGES: Partial<Record<string, string>> = {
  user_already_exists: "Un compte existe déjà avec cette adresse email.",
  email_exists: "Un compte existe déjà avec cette adresse email.",
  phone_exists: "Ce numéro de téléphone est déjà utilisé.",
  email_address_invalid: "Cette adresse email n'est pas valide.",
  email_address_not_authorized:
    "Cette adresse email n'est pas autorisée à s'inscrire.",
  weak_password:
    "Ce mot de passe est trop faible. Choisissez-en un plus robuste.",
  same_password: "Le nouveau mot de passe doit être différent de l'ancien.",
  invalid_credentials: "Email ou mot de passe incorrect.",
  email_not_confirmed:
    "Votre adresse email n'est pas encore confirmée. Vérifiez votre boîte mail.",
  user_banned: "Ce compte a été suspendu.",
  user_not_found: "Aucun compte ne correspond à ces informations.",
  signup_disabled: "Les inscriptions sont momentanément désactivées.",
  email_provider_disabled:
    "L'inscription par email est momentanément désactivée.",
  over_email_send_rate_limit:
    "Trop d'emails envoyés. Patientez quelques minutes avant de réessayer.",
  over_request_rate_limit:
    "Trop de tentatives. Patientez quelques minutes avant de réessayer.",
  otp_expired: "Ce lien a expiré. Demandez-en un nouveau.",
  flow_state_expired: "Ce lien a expiré. Demandez-en un nouveau.",
  captcha_failed: "La vérification anti-robot a échoué. Veuillez réessayer.",
  request_timeout: "Le serveur met trop de temps à répondre. Réessayez.",
  validation_failed: "Certaines informations sont invalides.",
};

/**
 * Traduit une erreur Supabase Auth en message affichable à l'utilisateur.
 */
export function getAuthErrorMessage(error: AuthError): string {
  if (isAuthRetryableFetchError(error)) {
    return "Impossible de joindre le serveur. Vérifiez votre connexion internet.";
  }

  if (error.code && AUTH_ERROR_MESSAGES[error.code]) {
    return AUTH_ERROR_MESSAGES[error.code]!;
  }

  if (error.status === 429) {
    return AUTH_ERROR_MESSAGES.over_request_rate_limit!;
  }

  return DEFAULT_MESSAGE;
}
