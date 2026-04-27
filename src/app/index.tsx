import { Redirect } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { View, ActivityIndicator } from "react-native";

import { useAuthStore } from "@/store";
import { Businesses } from "@/features";

/**
 * Public route for `/`. Root layout mounts `SessionUserRestorer`, which loads `user`
 * via `me` when `token` exists but MMKV has no `user` yet.
 */
export default function Index() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

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

  return <Businesses />;
}

const styles = StyleSheet.create(({ colors }) => ({
  restoringScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
}));
