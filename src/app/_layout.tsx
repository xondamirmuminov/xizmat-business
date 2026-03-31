import { useEffect } from "react";
import { Stack } from "expo-router";
import { Toaster } from "sonner-native";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native-unistyles";
import { ApolloProvider } from "@apollo/client/react";
import { useFonts } from "@expo-google-fonts/inter/useFonts";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold_Italic } from "@expo-google-fonts/inter/700Bold_Italic";
import { Inter_500Medium_Italic } from "@expo-google-fonts/inter/500Medium_Italic";
import { Inter_400Regular_Italic } from "@expo-google-fonts/inter/400Regular_Italic";

import "../i18n";

import { Inter_600SemiBold_Italic } from "@expo-google-fonts/inter/600SemiBold_Italic";

import { useAuthStore } from "@/store";
import { getToken } from "@/lib/helpers";
import { graphqlClient } from "@/graphql";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { token, setToken } = useAuthStore((state) => state);
  const [fontsLoaded, fontsError] = useFonts({
    Inter: Inter_400Regular,
    "Inter Bold": Inter_700Bold,
    "Inter Medium": Inter_500Medium,
    "Inter Semibold": Inter_600SemiBold,
    "Inter Italic": Inter_400Regular_Italic,
    "Inter Bold Italic": Inter_700Bold_Italic,
    "Inter Medium Italic": Inter_500Medium_Italic,
    "Inter Semibold Italic": Inter_600SemiBold_Italic,
  });

  const handleLoadToken = async () => {
    const savedToken = await getToken();

    if (savedToken !== token) {
      setToken(savedToken);
    }
  };

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  useEffect(() => {
    handleLoadToken();
  }, []);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <KeyboardProvider>
      <GestureHandlerRootView style={styles.gestureRootView}>
        <BottomSheetModalProvider>
          <ApolloProvider client={graphqlClient}>
            <Stack>
              <Stack.Protected guard={!token}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack.Protected>
            </Stack>
          </ApolloProvider>
        </BottomSheetModalProvider>
        <Toaster closeButton />
      </GestureHandlerRootView>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create(() => ({
  gestureRootView: { flex: 1 },
}));
