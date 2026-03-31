import React from "react";
import { Link } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAuthStore } from "@/store";
import { deleteToken } from "@/lib/helpers";
import { Button, Typography } from "@/components";

export default function Index() {
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    signOut();
    await deleteToken();
  };

  return (
    <View style={styles.container}>
      <Typography>Hello world from Unistyles</Typography>
      <Link href="/(auth)/sign-up">Sign up</Link>
      <Button color="error" onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
}));
