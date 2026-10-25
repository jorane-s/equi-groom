import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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

export default function Profil() {
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
    name: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 22,
      color: colors.heading,
    },
    email: {
      fontFamily: "Quicksand_500Medium",
      fontSize: 14,
      color: colors.muted,
      marginBottom: 24,
    },
    sectionTitle: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 16,
      color: colors.heading,
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
    rowText: {
      fontFamily: "Quicksand_500Medium",
      fontSize: 15,
      color: colors.heading,
    },
    deleteButton: {
      alignItems: "center",
      paddingVertical: 14,
      marginTop: 8,
    },
    deleteText: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 15,
      color: colors.error,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {(firstName || lastName) && (
        <Text style={styles.name} accessibilityRole="header">
          {[firstName, lastName].filter(Boolean).join(" ")}
        </Text>
      )}
      {user?.email && <Text style={styles.email}>{user.email}</Text>}

      <Text style={styles.sectionTitle} accessibilityRole="header">
        Informations légales
      </Text>
      {(Object.keys(LEGAL_DOCUMENTS) as LegalSlug[]).map((slug) => (
        <Link
          key={slug}
          href={{ pathname: "/legal/[slug]", params: { slug } }}
          asChild
        >
          <TouchableOpacity style={styles.row} accessibilityRole="link">
            <Text style={styles.rowText}>{LEGAL_DOCUMENTS[slug].title}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </TouchableOpacity>
        </Link>
      ))}

      <Text style={styles.sectionTitle} accessibilityRole="header">
        Compte
      </Text>
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
        <Text style={styles.deleteText}>
          {deleting ? "Suppression en cours…" : DELETE_TITLE}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
