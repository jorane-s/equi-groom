import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoginFormModel, loginSchema } from "@/schemas/login-schema";
import { supabaseClient } from "@/lib/supabase/supabase-client";
import { getAuthErrorMessage } from "@/lib/supabase/auth-errors";
import { signInWithGoogle } from "@/lib/supabase/google-auth";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import CurvedBottomImage from "@/components/ui/curved-bottom-image";
import { FormInput } from "@/components/ui/form-input";
import { FormAlert } from "@/components/ui/form-alert";
import { PrimaryButton } from "@/components/ui/primary-button";
import { LegalLink } from "@/components/ui/legal-link";
import { AppText } from "@/components/ui/app-text";
import { TEXT_VARIANTS } from "@/constants/typography";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Link } from "expo-router";

export default function Login() {
  const { colors } = useAppTheme();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { control, handleSubmit, setFocus } = useForm<LoginFormModel>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleGoogleLogin = async () => {
    setSubmitError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setSubmitError(error);
    }
  };

  const onSubmit = async (data: LoginFormModel) => {
    setSubmitError(null);
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      setSubmitError(getAuthErrorMessage(error));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      marginBottom: 30,
    },
    googleNotice: {
      textAlign: "center",
      marginTop: 6,
    },
    link: {
      ...TEXT_VARIANTS.link,
      textDecorationLine: "underline",
      color: colors.heading,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <CurvedBottomImage
        imageSrc={require("@/assets/images/login.png")}
      ></CurvedBottomImage>
      <AppText variant="h1" style={styles.title} accessibilityRole="header">
        Bienvenue dans Equigroom
      </AppText>
      <FormInput
        control={control}
        name="email"
        label="Email"
        icon={require("@/assets/icons/box.png")}
        placeholder="Ex : jean.dupont@mail.com"
        autoCapitalize="none"
        autoCorrect={false}
        inputMode="email"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="username"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => setFocus("password")}
      />
      <FormInput
        control={control}
        name="password"
        label="Mot de passe"
        icon={require("@/assets/icons/lock.png")}
        placeholder="Votre mot de passe"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={handleSubmit(onSubmit)}
      />
      {submitError && <FormAlert message={submitError} />}
      <PrimaryButton
        label="Se connecter"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        onPress={handleGoogleLogin}
        accessibilityLabel="Se connecter avec Google"
      ></GoogleSigninButton>
      <AppText variant="caption" color="muted" style={styles.googleNotice}>
        En continuant avec Google, vous acceptez nos{" "}
        <LegalLink slug="cgu">CGU</LegalLink> et reconnaissez avoir pris
        connaissance de notre{" "}
        <LegalLink slug="confidentialite">
          politique de confidentialité
        </LegalLink>
        .
      </AppText>
      <Link style={styles.link} href="/register">
        Mot de passe oublié ?
      </Link>
      <Link style={styles.link} href="/register">
        Pas encore de compte ? S’inscrire
      </Link>
    </View>
  );
}
