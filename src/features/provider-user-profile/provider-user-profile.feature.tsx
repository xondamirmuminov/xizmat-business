import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { useRef, useMemo, useCallback, type ReactNode } from "react";
import {
  View,
  Switch,
  ScrollView,
  RefreshControl,
  useColorScheme,
} from "react-native";

import { UserType } from "@/types";
import { Flex } from "@/components";
import { useAuthStore, useThemeStore } from "@/store";
import { ME_QUERY } from "@/features/auth/api/me.query";
import {
  ProfileSettingsRow,
  ProfileSettingsSection,
} from "@/features/business/business-profile/components";
import {
  SunIcon,
  LockIcon,
  MoonIcon,
  GlobeIcon,
  PhoneIcon,
  LogOutIcon,
  UserPenIcon,
} from "@/assets";

import {
  ConfirmSignOutModal,
  ProviderProfileUserDetailsCard,
  ProviderProfileUserDetailsCardSkeleton,
} from "./components";

type MeQueryResult = { me: UserType };

const LANGUAGE_CODES = new Set(["en", "uz", "ru"]);

export function ProviderUserProfile() {
  const signOutModalRef = useRef<BottomSheetModal>(null);
  const { token } = useAuthStore();
  const router = useRouter();

  const { t, i18n } = useTranslation();
  const rawLang = (i18n.language ?? "en").split("-")[0] ?? "en";
  const langKey = LANGUAGE_CODES.has(rawLang) ? rawLang : "en";
  const currentLanguageLabel = t(`profile.lang_${langKey}`);

  const { theme } = useUnistyles();
  const systemColorScheme = useColorScheme();

  const currentTheme = useThemeStore((s) => s.currentTheme);
  const setCurrentTheme = useThemeStore((s) => s.setCurrentTheme);

  const isDarkMode = useMemo(
    () =>
      currentTheme === "dark" ||
      (currentTheme === "system-default" && systemColorScheme === "dark"),
    [currentTheme, systemColorScheme],
  );

  const pushRoute = (path: string) => {
    (router as { push: (href: string) => void }).push(path);
  };

  const handleThemeSwitch = (value: boolean) => {
    setCurrentTheme(value ? "dark" : "light");
  };

  const { data, loading, refetch, networkStatus } = useQuery<MeQueryResult>(
    ME_QUERY,
    {
      skip: !token,
      notifyOnNetworkStatusChange: true,
    },
  );

  const handlePresentSignOutModal = useCallback(() => {
    signOutModalRef.current?.present();
  }, []);

  const user = data?.me as UserType | undefined;
  const refreshing = networkStatus === NetworkStatus.refetch;

  let userHeader: ReactNode = null;
  if (loading) {
    userHeader = <ProviderProfileUserDetailsCardSkeleton />;
  } else if (user) {
    userHeader = <ProviderProfileUserDetailsCard user={user} />;
  }

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refetch()}
              tintColor={theme.colors.primary10}
            />
          }
        >
          <Flex gap={2}>
            {userHeader}

            <ProfileSettingsSection label={t("user_profile.sections.account")}>
              <ProfileSettingsRow
                startIcon={<UserPenIcon />}
                onPress={() => pushRoute("/edit-profile")}
                title={t("user_profile.section_items.edit_personal_details")}
              />
              <ProfileSettingsRow
                startIcon={<LockIcon />}
                onPress={() => pushRoute("/change-password")}
                title={t("user_profile.section_items.change_password")}
              />
            </ProfileSettingsSection>

            <ProfileSettingsSection
              label={t("user_profile.sections.preferences")}
            >
              <ProfileSettingsRow
                startIcon={<GlobeIcon />}
                value={currentLanguageLabel}
                onPress={() => pushRoute("/change-language")}
                title={t("user_profile.section_items.language")}
              />
              <ProfileSettingsRow
                showChevron={false}
                title={t("user_profile.section_items.theme")}
                onPress={() => handleThemeSwitch(!isDarkMode)}
                startIcon={isDarkMode ? <MoonIcon /> : <SunIcon />}
                value={
                  isDarkMode
                    ? t("profile.theme_value_dark")
                    : t("profile.theme_value_light")
                }
                endContent={
                  <Switch
                    value={isDarkMode}
                    onValueChange={handleThemeSwitch}
                    thumbColor={theme.colors.background}
                    trackColor={{
                      false: theme.colors.slate4,
                      true: theme.colors.primary6,
                    }}
                  />
                }
              />
            </ProfileSettingsSection>

            <ProfileSettingsSection label={t("user_profile.sections.support")}>
              <ProfileSettingsRow
                startIcon={<PhoneIcon />}
                onPress={() => pushRoute("/contact-us")}
                title={t("user_profile.section_items.contact_us")}
              />
            </ProfileSettingsSection>

            <ProfileSettingsSection label={t("user_profile.sections.sign_out")}>
              <ProfileSettingsRow
                variant="danger"
                showChevron={false}
                startIcon={<LogOutIcon />}
                onPress={handlePresentSignOutModal}
                title={t("user_profile.section_items.sign_out")}
              />
            </ProfileSettingsSection>
          </Flex>
          <ConfirmSignOutModal ref={signOutModalRef} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: space(2),
    paddingBottom: space(3),
    paddingHorizontal: space(2),
  },
}));
