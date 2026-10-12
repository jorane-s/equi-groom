import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, registerSchema } from "@/schemas/register-schema";
import {
  Fredoka_300Light,
  Fredoka_600SemiBold,
  useFonts,
} from "@expo-google-fonts/fredoka";
import { Quicksand_500Medium } from "@expo-google-fonts/quicksand";
import { Image } from "expo-image";
import { supabaseClient } from "@/lib/supabase/supabase-client";
import * as Linking from "expo-linking";

export default function Register() {
  const [step, setStep] = useState<number>(1);
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<RegisterFormSchema>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  let [fontsLoaded] = useFonts({
    Fredoka_600SemiBold,
    Fredoka_300Light,
    Quicksand_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleNextStep = () => {
    setStep(2);
  };

  const onSubmit = async (formData: RegisterFormSchema) => {
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
        },
      },
    });

    if (error) {
      console.error(error);
    }
  };

  const isFirstStepValid =
    dirtyFields.firstName &&
    dirtyFields.lastName &&
    !errors.firstName &&
    !errors.lastName &&
    !errors.phone;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Image
        source={require("@/assets/images/register.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Créer un compte</Text>

      <View style={styles.stepIndicator}>
        <View style={[styles.dot, step === 1 && styles.activeDot]} />
        <View style={[styles.dot, step === 2 && styles.activeDot]} />
      </View>

      {step === 1 ? (
        <View style={styles.formGroup}>
          <Text style={styles.title}>Faisons connaissance !</Text>

          <View style={styles.nameContainer}>
            <View className={"flex-1"}>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <Image
                      source={require("@/assets/icons/name.png")}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Ex: Doe"
                      style={styles.input}
                      placeholderTextColor="#888"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                )}
              />
              {errors.lastName && (
                <Text style={styles.error}>{errors.lastName.message}</Text>
              )}
            </View>
            <View className={"flex-1"}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <Image
                      source={require("@/assets/icons/first_name.png")}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Ex: John"
                      style={styles.input}
                      placeholderTextColor="#888"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                )}
              />
              {errors.firstName && (
                <Text style={styles.error}>{errors.firstName.message}</Text>
              )}
            </View>
          </View>

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Image
                  source={require("@/assets/icons/phone.png")}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Ex: +33645216532"
                  style={styles.input}
                  placeholderTextColor="#888"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  inputMode={"tel"}
                />
              </View>
            )}
          />
          {errors.phone && (
            <Text style={styles.error}>{errors.phone.message}</Text>
          )}
          <TouchableOpacity
            style={[styles.button, !isFirstStepValid && styles.buttonDisabled]}
            onPress={handleNextStep}
            disabled={!isFirstStepValid}
          >
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formGroup}>
          <Text style={styles.title}>Vos identifiants</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer} className={"mb-2.5"}>
                <Image
                  source={require("@/assets/icons/box.png")}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#888"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  inputMode={"email"}
                />
              </View>
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer} className={"w-full"}>
                <Image
                  source={require("@/assets/icons/lock.png")}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Mot de passe"
                  secureTextEntry
                  style={styles.input}
                  placeholderTextColor="#888"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  underlineColorAndroid="transparent"
                />
              </View>
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              Object.values(errors).length > 0 && styles.buttonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={Object.values(errors).length > 0}
          >
            <Text style={styles.buttonText}>Créer mon compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setStep(1)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Modifier mes informations</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFBF7",
    padding: 20,
  },
  title: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 26,
    color: "#4A3525",
    marginBottom: 30,
    fontWeight: "bold",
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
    backgroundColor: "#E5D6C5",
    marginHorizontal: 6,
  },
  activeDot: {
    width: 24,
    backgroundColor: "#C86D51",
  },
  formGroup: {
    width: "100%",
    marginBottom: 15,
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#F5EFEB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D4C5B9",
    height: 40,
    paddingHorizontal: 5,
  },
  inputIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  input: {
    fontFamily: "Quicksand_500Medium",
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#D97D65",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Fredoka_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  backButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 4,
  },
  backText: {
    color: "#8C6D62",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  error: {
    color: "#D97D65",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 5,
  },
  image: {
    width: "20%",
    height: "35%",
  },
});
