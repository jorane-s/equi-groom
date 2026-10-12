import { Stack, ThemeProvider, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import * as Linking from "expo-linking";
import { CustomDarkTheme, CustomLightTheme } from "@/color-theme";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { supabaseClient } from "@/lib/supabase/supabase-client";
import "../../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const { session, setSession } = useAuthStore(
    useShallow((state) => ({
      session: state.session,
      setSession: state.setSession,
    })),
  );

  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      const parsed = Linking.parse(url);
      const code = parsed.queryParams?.code;

      if (typeof code === "string") {
        const { data, error } =
          await supabaseClient.auth.exchangeCodeForSession(code);

        if (error) {
          console.error("Erreur validation lien :", error.message);
        } else if (data.session) {
          console.log("Connecté via lien !");
        }
      }
    };

    const subscription = Linking.addEventListener("url", (event) => {
      handleDeepLink(event.url);
    });

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);

  // Handle current session and session change
  useEffect(() => {
    supabaseClient.auth.getSession().then((response) => {
      setSession(response.data.session);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setSession(session);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Router redirection on session change
  useEffect(() => {
    if (session === undefined) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.navigate("/(auth)/login");
    } else if (session && inAuthGroup) {
      router.navigate("/(main)");
    }
  }, [session, segments]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
      <ThemeProvider
        value={colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme}
      >
        <AnimatedSplashOverlay />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
