import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  RequestResponse,
  supabaseClient,
} from "@/lib/supabase/supabase-client";
import { getAuthErrorMessage } from "@/lib/supabase/auth-errors";
import { getTermsAcceptanceMetadata } from "@/constants/legal.constants";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

/**
 * Connexion (ou inscription) via Google puis Supabase.
 * Une annulation par l'utilisateur renvoie `success: false` sans `error`.
 */
export async function signInWithGoogle(): Promise<RequestResponse<void>> {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (!isSuccessResponse(response) || !response.data.idToken) {
      return { success: false };
    }

    const { data, error } = await supabaseClient.auth.signInWithIdToken({
      provider: "google",
      token: response.data.idToken,
    });

    if (error) {
      return { success: false, error: getAuthErrorMessage(error) };
    }

    // Première connexion Google : l'acceptation des CGU (mention affichée
    // sous le bouton) est enregistrée comme pour une inscription classique
    if (!data.user.user_metadata?.terms_version) {
      const { error: updateError } = await supabaseClient.auth.updateUser({
        data: getTermsAcceptanceMetadata(),
      });
      if (updateError) {
        console.error("Erreur enregistrement acceptation CGU :", updateError);
      }
    }
    return { success: true };
  } catch (e) {
    if (isErrorWithCode(e)) {
      if (e.code === statusCodes.IN_PROGRESS) {
        return { success: false };
      }
      if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          success: false,
          error: "Les services Google Play sont indisponibles ou obsolètes.",
        };
      }
    }
    console.error("Erreur inattendue Google Sign-In :", e);
    return {
      success: false,
      error: "La connexion avec Google a échoué. Veuillez réessayer.",
    };
  }
}
