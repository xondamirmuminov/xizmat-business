import type { Href } from "expo-router";

import { Redirect } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { View, ActivityIndicator } from "react-native";

import { useAuthStore } from "@/store";

export default function Index() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const businessId = useAuthStore((s) => s.businessId);

  if (!token) {
    return <Redirect href="/sign-in" />;
  }

  if (!user?._id) {
    return (
      <View style={styles.restoringScreen}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (businessId) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href={"/(pre-work)/(tabs)/businesses" as Href} />;
}

const styles = StyleSheet.create(({ colors }) => ({
  restoringScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
}));
