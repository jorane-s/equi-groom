import { Stack, ThemeProvider, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { CustomDarkTheme, CustomLightTheme } from "@/color-theme";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { supabaseClient } from "@/lib/supabase/supabase-client";

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

  // Handle current session and session change
  useEffect(() => {
    supabaseClient.auth.getSession().then((response) => {
      setSession(response.data.session);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Router redirection on session change
  useEffect(() => {
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
