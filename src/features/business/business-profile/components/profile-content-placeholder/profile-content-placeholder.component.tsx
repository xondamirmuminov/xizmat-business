import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Flex, Typography } from "@/components";

type ProfileContentPlaceholderProps = {
  bodyKey: string;
  titleKey: string;
};

export function ProfileContentPlaceholder({
  bodyKey,
  titleKey,
}: ProfileContentPlaceholderProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: t(titleKey) });
  }, [navigation, t, titleKey]);

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <Flex style={styles.body}>
        <Typography color="secondary">{t(bodyKey)}</Typography>
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { paddingTop: space(1), paddingHorizontal: space(2) },
}));
