import {
  RequestResponse,
  supabaseClient,
} from "@/lib/supabase/supabase-client";
import camelcaseKeys from "camelcase-keys";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { UserProfile } from "@/lib/supabase/models/profile";

export async function getProfileById(
  id: string,
): Promise<RequestResponse<UserProfile>> {
  try {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(
        "Erreur lors de la récupération du profil :",
        error.message,
      );
      return { success: false, error: error.message };
    } else {
      return { success: true, data: camelcaseKeys(data, { deep: true }) };
    }
  } catch (e) {
    console.error("Erreur inattendue :", e);
    return { success: false, error: e + "" };
  }
}

export async function deleteUserById(
  id: string,
): Promise<RequestResponse<void>> {
  try {
    const { error } = await supabaseClient.functions.invoke("delete-account", {
      method: "POST",
      body: { userId: id },
    });

    if (error) {
      console.error("Erreur lors de la suppression du compte :", error);
      return {
        success: false,
        error:
          "La suppression du compte a échoué. Réessayez ou contactez-nous.",
      };
    }

    // Révoque l'accès Google si le compte y était lié (sans effet sinon)
    await GoogleSignin.revokeAccess().catch(() => {});
    // L'utilisateur n'existe plus côté serveur : on nettoie la session locale
    await supabaseClient.auth.signOut({ scope: "local" });
    return { success: true };
  } catch (e) {
    console.error("Erreur inattendue :", e);
    return { success: false, error: e + "" };
  }
}
