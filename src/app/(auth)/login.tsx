import { Text } from "@expo/ui";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  useFonts,
  Fredoka_600SemiBold,
  Fredoka_300Light,
} from "@expo-google-fonts/fredoka";
import { Quicksand_500Medium } from "@expo-google-fonts/quicksand";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { LoginFormModel, loginSchema } from "@/schemas/login-schema";
import { supabaseClient } from "@/lib/supabase/supabase-client";
import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import CurvedBottomImage from "@/components/ui/curved-bottom-image";
import { Link } from "expo-router";

export default function Login() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
  }, []);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormModel>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  let [fontsLoaded] = useFonts({
    Fredoka_600SemiBold,
    Fredoka_300Light,
    Quicksand_500Medium,
  });

  if (!fontsLoaded) {
    return null; // ou un composant de chargement
  }

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response) && response.data?.idToken) {
        const { data, error } = await supabaseClient.auth.signInWithIdToken({
          provider: "google",
          token: response.data.idToken,
        });
        if (error) {
          console.error(error);
        }
      } else {
      }
    } catch (error: any) {
      if (error.code === statusCodes.IN_PROGRESS) {
        return;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const onSubmit = async (data: LoginFormModel) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: data.email.trim(),
      password: data.password,
    });
    setLoading(false);

    if (error) {
      //Alert.alert("Échec de la connexion", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CurvedBottomImage
        imageSrc={require("@/assets/images/login.png")}
      ></CurvedBottomImage>
      <Text textStyle={styles.title}>Bienvenue dans Equigroom</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#888"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && (
        <Text textStyle={styles.error}>{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#888"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text textStyle={styles.error}>{errors.password.message}</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text textStyle={styles.buttonText}>Se connecter</Text>
        )}
      </TouchableOpacity>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        onPress={handleGoogleLogin}
      ></GoogleSigninButton>
      <Link style={styles.link} href="/register">
        Mot de passe oublié ?
      </Link>
      <Link style={styles.link} href="/register">
        Pas encore de compte ? S'inscrire
      </Link>
    </View>
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
  link: {
    textDecorationLine: "underline",
    fontFamily: "Fredoka_300Light",
    marginTop: 10,
  },
  input: {
    fontFamily: "Quicksand_500Medium",
    width: "100%",
    backgroundColor: "#F5EFEB",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D4C5B9",
  },
  button: {
    backgroundColor: "#D97D65",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Fredoka_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#D97D65",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 5,
  },
  image: {
    width: "25%",
    height: "40%",
  },
});
