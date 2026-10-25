import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PASSWORD_RULES,
  RegisterFormModel,
  registerSchema,
} from "@/schemas/register-schema";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { supabaseClient } from "@/lib/supabase/supabase-client";
import { getAuthErrorMessage } from "@/lib/supabase/auth-errors";
import { signInWithGoogle } from "@/lib/supabase/google-auth";
import { useAppTheme } from "@/hooks/use-app-theme";
import { FormInput } from "@/components/ui/form-input";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import { FormAlert } from "@/components/ui/form-alert";
import { PrimaryButton } from "@/components/ui/primary-button";
import { LegalLink } from "@/components/ui/legal-link";
import { getTermsAcceptanceMetadata } from "@/constants/legal.constants";

const FIRST_STEP_FIELDS = ["firstName", "lastName", "phone"] as const;

export default function Register() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { control, handleSubmit, trigger, setFocus } =
    useForm<RegisterFormModel>({
      mode: "onTouched",
      resolver: zodResolver(registerSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        acceptTerms: false,
      },
    });
  const password = useWatch({ control, name: "password" });

  const handleNextStep = async () => {
    const isValid = await trigger(FIRST_STEP_FIELDS, { shouldFocus: true });
    if (isValid) {
      setSubmitError(null);
      setStep(2);
    }
  };

  const handleGoogleSignUp = async () => {
    setSubmitError(null);
    const { error } = await signInWithGoogle();
    // En cas de succès, le layout racine redirige vers l'app
    if (error) {
      setSubmitError(error);
    }
  };

  const onSubmit = async (formData: RegisterFormModel) => {
    setSubmitError(null);
    setLoading(true);
    const redirectUrl = Linking.createURL("/(main)");
    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
      ...(formData.phone && { phone: formData.phone }),
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          ...getTermsAcceptanceMetadata(),
        },
      },
    });

    setLoading(false);

    if (error) {
      setSubmitError(getAuthErrorMessage(error));
      return;
    }

    if (!data.session) {
      router.replace({
        pathname: "/check-email",
        params: { email: formData.email },
      });
    }
  };

  const styles = StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    image: {
      width: "20%",
      height: 200,
    },
    title: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 26,
      color: colors.heading,
      marginTop: 10,
      marginBottom: 16,
    },
    subtitle: {
      fontFamily: "Fredoka_600SemiBold",
      fontSize: 20,
      color: colors.heading,
      marginBottom: 16,
    },
    stepIndicator: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.inactive,
      marginHorizontal: 6,
    },
    activeDot: {
      width: 24,
      backgroundColor: colors.brandDarker,
    },
    formGroup: {
      width: "100%",
      marginBottom: 15,
    },
    nameContainer: {
      flexDirection: "row",
      gap: 10,
    },
    googleButton: {
      width: "100%",
      height: 48,
    },
    googleNotice: {
      fontFamily: "Quicksand_500Medium",
      fontSize: 12,
      color: colors.muted,
      textAlign: "center",
      marginTop: 6,
    },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginVertical: 18,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      fontFamily: "Quicksand_500Medium",
      color: colors.muted,
    },
    rules: {
      marginTop: -4,
      marginBottom: 8,
      marginLeft: 4,
      gap: 4,
    },
    rule: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    ruleText: {
      fontFamily: "Quicksand_500Medium",
      fontSize: 12,
      color: colors.muted,
    },
    ruleTextValid: {
      color: colors.success,
    },
    backButton: {
      alignItems: "center",
      paddingVertical: 12,
      marginTop: 4,
    },
    backText: {
      fontFamily: "Quicksand_500Medium",
      color: colors.muted,
      fontSize: 14,
      textDecorationLine: "underline",
    },
    loginLink: {
      fontFamily: "Fredoka_300Light",
      color: colors.heading,
      textDecorationLine: "underline",
      marginTop: 6,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("@/assets/images/register.png")}
          style={styles.image}
          contentFit="contain"
          accessible={false}
        />
        <Text style={styles.title} accessibilityRole="header">
          Créer un compte
        </Text>

        <View
          style={styles.stepIndicator}
          accessible
          accessibilityLabel={`Étape ${step} sur 2`}
        >
          <View style={[styles.dot, step === 1 && styles.activeDot]} />
          <View style={[styles.dot, step === 2 && styles.activeDot]} />
        </View>

        {step === 1 ? (
          <View style={styles.formGroup}>
            <GoogleSigninButton
              style={styles.googleButton}
              size={GoogleSigninButton.Size.Wide}
              onPress={handleGoogleSignUp}
              accessibilityLabel="S'inscrire avec Google"
            />
            <Text style={styles.googleNotice}>
              En continuant avec Google, vous acceptez nos{" "}
              <LegalLink slug="cgu">CGU</LegalLink> et reconnaissez avoir pris
              connaissance de notre{" "}
              <LegalLink slug="confidentialite">
                politique de confidentialité
              </LegalLink>
              .
            </Text>

            <View style={styles.divider} importantForAccessibility="no">
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <Text style={styles.subtitle} accessibilityRole="header">
              Faisons connaissance !
            </Text>

            <View style={styles.nameContainer}>
              <FormInput
                control={control}
                name="firstName"
                label="Prénom"
                icon={require("@/assets/icons/first_name.png")}
                placeholder="Ex : Jean"
                style={{ flex: 1 }}
                autoCapitalize="words"
                autoComplete="given-name"
                textContentType="givenName"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => setFocus("lastName")}
              />
              <FormInput
                control={control}
                name="lastName"
                label="Nom"
                icon={require("@/assets/icons/name.png")}
                placeholder="Ex : Dupont"
                style={{ flex: 1 }}
                autoCapitalize="words"
                autoComplete="family-name"
                textContentType="familyName"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => setFocus("phone")}
              />
            </View>

            <FormInput
              control={control}
              name="phone"
              label="Téléphone (facultatif)"
              icon={require("@/assets/icons/phone.png")}
              placeholder="Ex : 06 45 21 65 32"
              inputMode="tel"
              autoComplete="tel"
              textContentType="telephoneNumber"
              returnKeyType="done"
              onSubmitEditing={handleNextStep}
            />

            {submitError && <FormAlert message={submitError} />}

            <PrimaryButton label="Continuer" onPress={handleNextStep} />
          </View>
        ) : (
          <View style={styles.formGroup}>
            <Text style={styles.subtitle} accessibilityRole="header">
              Vos identifiants
            </Text>

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
              textContentType="emailAddress"
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
              autoComplete="new-password"
              textContentType="newPassword"
              passwordRules="minlength: 8; required: upper; required: lower; required: digit;"
              returnKeyType="done"
            />

            <View
              style={styles.rules}
              accessible
              accessibilityLabel={`Règles du mot de passe : ${PASSWORD_RULES.map(
                (rule) =>
                  `${rule.label} ${rule.test(password) ? "respectée" : "non respectée"}`,
              ).join(", ")}`}
            >
              {PASSWORD_RULES.map((rule) => {
                const valid = rule.test(password);
                return (
                  <View key={rule.label} style={styles.rule}>
                    <Ionicons
                      name={valid ? "checkmark-circle" : "ellipse-outline"}
                      size={14}
                      color={valid ? colors.success : colors.muted}
                    />
                    <Text
                      style={[styles.ruleText, valid && styles.ruleTextValid]}
                    >
                      {rule.label}
                    </Text>
                  </View>
                );
              })}
            </View>

            <FormCheckbox
              control={control}
              name="acceptTerms"
              accessibilityLabel="J'accepte les conditions générales d'utilisation et j'ai pris connaissance de la politique de confidentialité"
            >
              J’accepte les{" "}
              <LegalLink slug="cgu">
                conditions générales d’utilisation
              </LegalLink>{" "}
              et j’ai pris connaissance de la{" "}
              <LegalLink slug="confidentialite">
                politique de confidentialité
              </LegalLink>
              .
            </FormCheckbox>

            {submitError && <FormAlert message={submitError} />}

            <PrimaryButton
              label="Créer mon compte"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />

            <TouchableOpacity
              onPress={() => setStep(1)}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Revenir à l'étape précédente pour modifier mes informations"
            >
              <Text style={styles.backText}>← Modifier mes informations</Text>
            </TouchableOpacity>
          </View>
        )}

        <Link style={styles.loginLink} href="/login" replace>
          Déjà un compte ? Se connecter
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
