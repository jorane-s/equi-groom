import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/store/useAuthStore";
import { useAppTheme } from "@/hooks/use-app-theme";
import { deleteUserById } from "@/lib/supabase/profiles";
import { FormAlert } from "@/components/ui/form-alert";
import { PrimaryButton } from "@/components/ui/primary-button";
import { AppText } from "@/components/ui/app-text";
import { LEGAL_DOCUMENTS, LegalSlug } from "@/constants/legal.constants";

const DELETE_TITLE = "Supprimer mon compte";
const DELETE_MESSAGE =
  "Votre compte et toutes vos données (chevaux, suivi de santé, rendez-vous) seront définitivement supprimés. Cette action est irréversible.";

/** Demande de confirmation compatible mobile et web */
function confirmDeletion(): Promise<boolean> {
  if (Platform.OS === "web") {
    return Promise.resolve(
      window.confirm(`${DELETE_TITLE}\n\n${DELETE_MESSAGE}`),
    );
  }
  return new Promise((resolve) =>
    Alert.alert(DELETE_TITLE, DELETE_MESSAGE, [
      { text: "Annuler", style: "cancel", onPress: () => resolve(false) },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => resolve(true),
      },
    ]),
  );
}

export default function UserProfile() {
  const { colors } = useAppTheme();
  const { user, profile, signOut, setSession } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      profile: state.profile,
      signOut: state.signOut,
      setSession: state.setSession,
    })),
  );
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firstName = profile?.firstName ?? user?.user_metadata?.first_name;
  const lastName = profile?.lastName ?? user?.user_metadata?.last_name;

  const handleDelete = async () => {
    if (!user || !(await confirmDeletion())) return;
    setError(null);
    setDeleting(true);
    const response = await deleteUserById(user.id);
    setDeleting(false);

    if (!response.success) {
      setError(response.error ?? null);
      return;
    }
    // Plus de session : le layout racine renvoie vers la connexion
    setSession(null);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 40,
    },
    email: {
      marginBottom: 24,
    },
    sectionTitle: {
      marginTop: 16,
      marginBottom: 8,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.inactive,
    },
    deleteButton: {
      alignItems: "center",
      paddingVertical: 14,
      marginTop: 8,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {(firstName || lastName) && (
        <AppText variant="h2" accessibilityRole="header">
          {[firstName, lastName].filter(Boolean).join(" ")}
        </AppText>
      )}
      {user?.email && (
        <AppText color="muted" style={styles.email}>
          {user.email}
        </AppText>
      )}

      <AppText
        variant="h3"
        style={styles.sectionTitle}
        accessibilityRole="header"
      >
        Informations légales
      </AppText>
      {(Object.keys(LEGAL_DOCUMENTS) as LegalSlug[]).map((slug) => (
        <Link
          key={slug}
          href={{ pathname: "/legal/[slug]", params: { slug } }}
          asChild
        >
          <TouchableOpacity style={styles.row} accessibilityRole="link">
            <AppText>{LEGAL_DOCUMENTS[slug].title}</AppText>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </TouchableOpacity>
        </Link>
      ))}

      <AppText
        variant="h3"
        style={styles.sectionTitle}
        accessibilityRole="header"
      >
        Compte
      </AppText>
      <PrimaryButton label="Se déconnecter" onPress={signOut} />

      {error && <FormAlert message={error} />}

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        disabled={deleting}
        accessibilityRole="button"
        accessibilityLabel={DELETE_TITLE}
        accessibilityHint="Supprime définitivement votre compte et vos données"
        accessibilityState={{ disabled: deleting, busy: deleting }}
      >
        <AppText variant="button" color="error">
          {deleting ? "Suppression en cours…" : DELETE_TITLE}
        </AppText>
      </TouchableOpacity>
    </ScrollView>
  );
}
