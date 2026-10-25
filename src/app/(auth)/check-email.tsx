import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { supabaseClient } from "@/lib/supabase/supabase-client";
import { getAuthErrorMessage } from "@/lib/supabase/auth-errors";
import { useAppTheme } from "@/hooks/use-app-theme";
import { FormAlert } from "@/components/ui/form-alert";
import { PrimaryButton } from "@/components/ui/primary-button";

const RESEND_COOLDOWN_SECONDS = 60;

export default function CheckEmail() {
  const { colors } = useAppTheme();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Décompte avant de pouvoir renvoyer l'email
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email) return;
    setFeedback(null);
    setLoading(true);
    const { error } = await supabaseClient.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: Linking.createURL("/(main)") },
    });
    setLoading(false);

    if (error) {
      setFeedback({ type: "error", message: getAuthErrorMessage(error) });
      return;
    }

    setFeedback({
      type: "success",
      message: "Un nouvel email vous a été envoyé.",
    });
    setCooldown(RESEND_COOLDOWN_SECONDS);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 20,
    },
    image: {
      width: 90,
      height: 90,
      marginBottom: 20,
    },
    title: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 26,
      color: colors.heading,
      marginBottom: 20,
      textAlign: "center",
    },
    text: {
      fontFamily: "Quicksand_500Medium",
      fontSize: 15,
      color: colors.muted,
      textAlign: "center",
      lineHeight: 22,
    },
    email: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 16,
      color: colors.heading,
      marginVertical: 6,
      textAlign: "center",
    },
    button: {
      marginTop: 24,
    },
    link: {
      textDecorationLine: "underline",
      fontFamily: "Fredoka_300Light",
      color: colors.heading,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/icons/box.png")}
        style={styles.image}
        contentFit="contain"
        accessible={false}
      />
      <Text style={styles.title} accessibilityRole="header">
        Vérifiez votre boîte mail
      </Text>

      <Text style={styles.text}>
        Nous avons envoyé un lien de confirmation
        {email ? " à" : "."}
      </Text>
      {email && <Text style={styles.email}>{email}</Text>}
      <Text style={styles.text}>
        Cliquez dessus pour activer votre compte. Pensez à regarder dans vos
        spams si vous ne le trouvez pas.
      </Text>

      {feedback && (
        <FormAlert type={feedback.type} message={feedback.message} />
      )}

      <PrimaryButton
        style={styles.button}
        label={
          cooldown > 0 ? `Renvoyer l'email (${cooldown} s)` : "Renvoyer l'email"
        }
        onPress={handleResend}
        loading={loading}
        disabled={!email || cooldown > 0}
      />

      <Link style={styles.link} href="/login" replace>
        Retour à la connexion
      </Link>
    </View>
  );
}
