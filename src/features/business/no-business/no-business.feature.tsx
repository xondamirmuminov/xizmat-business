import { Image } from "expo-image";
import { Link } from "expo-router";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

import { NoBusinessImage } from "@/assets";
import { Flex, Button, Typography } from "@/components";

export function NoBusiness() {
  const { t } = useTranslation();

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
              {t("no_business.title")}
            </Typography>
            <Typography align="center">
              {t("no_business.description")}
            </Typography>
          </Flex>
          <Link asChild href="/create-business">
            <Button size="lg">{t("no_business.action")}</Button>
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
