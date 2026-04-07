import { Image } from "expo-image";
import { Link } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

import { NoBusinessImage } from "@/assets";
import { Flex, Button, Typography } from "@/components";

export function NoBusiness() {
  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea}>
        <Flex
          gap={3}
          alignItems="center"
          justifyContent="center"
          style={styles.container}
        >
          <Image
            contentFit="cover"
            style={styles.image}
            source={NoBusinessImage}
          />
          <Flex gap={1}>
            <Typography align="center" weight="medium" size="display-xs">
              No business yet
            </Typography>
            <Typography align="center">
              You do not have any business to work with, create a new business.
            </Typography>
          </Flex>
          <Link asChild href="/create-business">
            <Button size="lg">Create business</Button>
          </Link>
        </Flex>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: { flex: 1 },
  image: { height: 240, width: "100%" },
  container: { height: "100%", paddingInline: space(2) },
  screenContainer: {
    flex: 1,
    paddingBottom: space(3),
    backgroundColor: colors.background,
  },
}));
