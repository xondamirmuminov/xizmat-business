import { useLayoutEffect } from "react";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckIcon } from "@/assets";
import { useAuthStore } from "@/store";
import { Flex, Typography } from "@/components";

const LANGUAGE_CODES = ["en", "uz", "ru"] as const;

export function ChangeLanguage() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const setLanguage = useAuthStore((s) => s.setLanguage);

  const current = (i18n.language ?? "en").split("-")[0] as string;

  useLayoutEffect(() => {
    navigation.setOptions({ title: t("profile.change_language_title") });
  }, [navigation, t]);

  const applyLanguage = (code: (typeof LANGUAGE_CODES)[number]) => {
    i18n.changeLanguage(code).then(() => {
      setLanguage(code);
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <Flex gap={1} style={styles.list}>
        {LANGUAGE_CODES.map((code) => {
          const isActive = current === code;
          return (
            <Pressable
              key={code}
              onPress={() => applyLanguage(code)}
              style={({ pressed }) => [
                styles.row,
                pressed && styles.rowPressed,
                isActive && styles.rowActive,
              ]}
            >
              <Flex
                direction="row"
                alignItems="center"
                style={styles.rowInner}
                justifyContent="space-between"
              >
                <Typography weight="medium">
                  {t(`profile.lang_${code}`)}
                </Typography>
                {isActive ? <CheckIcon size={22} /> : null}
              </Flex>
            </Pressable>
          );
        })}
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  rowPressed: { opacity: 0.9 },
  safe: { flex: 1, backgroundColor: colors.background },
  list: { paddingTop: space(1), paddingHorizontal: space(2) },
  rowActive: {
    backgroundColor: colors.primarySubtle,
  },
  row: {
    borderRadius: 12,
    backgroundColor: colors.slate2,
  },
  rowInner: {
    paddingVertical: space(1.5),
    paddingHorizontal: space(2),
  },
}));
