import {
  RequestResponse,
  supabaseClient,
} from "@/lib/supabase/supabase-client";
import camelcaseKeys from "camelcase-keys";
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
