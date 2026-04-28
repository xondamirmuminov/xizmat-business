import { useMemo } from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { NetworkStatus } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import {
  View,
  Alert,
  Switch,
  ScrollView,
  RefreshControl,
  useColorScheme,
  ActivityIndicator,
} from "react-native";

import { BusinessType } from "@/types";
import { deleteToken } from "@/lib/helpers";
import { useAuthStore, useThemeStore } from "@/store";
import { Flex, Button, Typography } from "@/components";
import {
  SunIcon,
  MoonIcon,
  PhoneIcon,
  GlobeIcon,
  StoreIcon,
  LogOutIcon,
  DoorOpenIcon,
  HandCoinsIcon,
  HandHelpingIcon,
  ImagePlaceholder,
} from "@/assets";

import { BUSINESS_PROFILE_QUERY } from "./api";
import { ProfileSettingsRow, ProfileSettingsSection } from "./components";

const LANGUAGE_CODES = new Set(["en", "uz", "ru"]);

export function BusinessProfile() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { theme } = useUnistyles();
  const systemColorScheme = useColorScheme();

  const businessId = useAuthStore((s) => s.businessId);
  const user = useAuthStore((s) => s.user);
  const setBusinessId = useAuthStore((s) => s.setBusinessId);
  const signOut = useAuthStore((s) => s.signOut);

  const currentTheme = useThemeStore((s) => s.currentTheme);
  const setCurrentTheme = useThemeStore((s) => s.setCurrentTheme);

  const isDarkMode = useMemo(
    () =>
      currentTheme === "dark" ||
      (currentTheme === "system-default" && systemColorScheme === "dark"),
    [currentTheme, systemColorScheme],
  );

  const { data, error, loading, refetch, networkStatus } = useQuery<{
    business: BusinessType;
  }>(BUSINESS_PROFILE_QUERY, {
    skip: !businessId,
    variables: { id: businessId! },
    notifyOnNetworkStatusChange: true,
  });

  const business = data?.business;
  const refreshing = networkStatus === NetworkStatus.refetch;

  const providerAvatarUri = business?.provider?.avatar ?? user?.avatar;
  const avatarSource = providerAvatarUri
    ? { uri: providerAvatarUri }
    : undefined;

  const rawLang = (i18n.language ?? "en").split("-")[0] ?? "en";
  const langKey = LANGUAGE_CODES.has(rawLang) ? rawLang : "en";
  const currentLanguageLabel = t(`profile.lang_${langKey}`);

  const pushRoute = (path: string) => {
    (router as { push: (href: string) => void }).push(path);
  };

  const handleExitBusiness = () => {
    setBusinessId(null);
    router.replace("/");
  };

  const performSignOut = async () => {
    signOut();
    await deleteToken();
  };

  const handleSignOutPress = () => {
    Alert.alert(
      t("profile.sign_out_confirm_title"),
      t("profile.sign_out_confirm_message"),
      [
        { style: "cancel", text: t("profile.sign_out_cancel") },
        {
          style: "destructive",
          text: t("profile.sign_out_confirm"),
          onPress: () => {
            void performSignOut();
          },
        },
      ],
    );
  };

  const handleThemeSwitch = (value: boolean) => {
    setCurrentTheme(value ? "dark" : "light");
  };

  if (!businessId) {
    return null;
  }

  if (loading && !business) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <Flex gap={2} style={styles.centered}>
          <Typography align="center" size="text-sm" color="secondary">
            {t("profile.load_error")}
          </Typography>
          <Button color="secondary" onPress={() => void refetch()}>
            {t("businesses_list.retry")}
          </Button>
        </Flex>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void refetch()}
            tintColor={theme.colors.primary10}
          />
        }
      >
        <Flex gap={2}>
          <Flex
            gap={2}
            direction="row"
            alignItems="center"
            style={styles.headerCard}
          >
            <Image
              contentFit="cover"
              style={styles.logo}
              placeholderContentFit="cover"
              placeholder={ImagePlaceholder}
              source={business?.logo ? { uri: business.logo } : undefined}
            />
            <Flex gap={0.5} flexShrink={1}>
              <Typography numberOfLines={2} weight="semibold">
                {business?.name ?? "—"}
              </Typography>
            </Flex>
          </Flex>

          <View>
            <Typography
              size="text-sm"
              color="secondary"
              style={styles.inlineSectionLabel}
            >
              {t("profile.section_provider")}
            </Typography>
            <Flex
              gap={2}
              direction="row"
              alignItems="center"
              style={styles.providerCard}
            >
              <Image
                contentFit="cover"
                source={avatarSource}
                style={styles.avatar}
                placeholderContentFit="cover"
                placeholder={ImagePlaceholder}
              />
              <Flex flexShrink={1}>
                <Typography weight="medium" numberOfLines={1}>
                  {business?.provider?.fullName ?? user?.fullName ?? "—"}
                </Typography>
              </Flex>
            </Flex>
          </View>

          <ProfileSettingsSection label={t("profile.section_business")}>
            <ProfileSettingsRow
              startIcon={<StoreIcon />}
              title={t("profile.row_business_details")}
              onPress={() => pushRoute("/business-details")}
            />
            <ProfileSettingsRow
              startIcon={<HandHelpingIcon />}
              title={t("profile.row_services")}
              onPress={() => pushRoute("/services")}
            />
          </ProfileSettingsSection>

          <ProfileSettingsSection label={t("profile.section_support")}>
            <ProfileSettingsRow
              startIcon={<PhoneIcon />}
              title={t("profile.row_contact_us")}
              onPress={() => pushRoute("/contact-us")}
            />
            <ProfileSettingsRow
              startIcon={<HandCoinsIcon />}
              title={t("profile.row_how_payments_work")}
              onPress={() => pushRoute("/how-payments-work")}
            />
          </ProfileSettingsSection>

          <ProfileSettingsSection label={t("profile.section_preferences")}>
            <ProfileSettingsRow
              startIcon={<GlobeIcon />}
              value={currentLanguageLabel}
              title={t("profile.row_change_language")}
              onPress={() => pushRoute("/change-language")}
            />
            <ProfileSettingsRow
              showChevron={false}
              title={t("profile.row_theme")}
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

          <ProfileSettingsSection label={t("profile.section_account")}>
            <ProfileSettingsRow
              startIcon={<DoorOpenIcon />}
              onPress={handleExitBusiness}
              title={t("profile.exit_business")}
            />
            <ProfileSettingsRow
              variant="danger"
              startIcon={<LogOutIcon />}
              onPress={handleSignOutPress}
              title={t("profile.sign_out")}
            />
          </ProfileSettingsSection>
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safe: { flex: 1, backgroundColor: colors.background },
  inlineSectionLabel: {
    marginBottom: space(0.5),
  },
  headerCard: {
    borderRadius: 12,
    padding: space(2),
    backgroundColor: colors.slate2,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.slate3,
  },
  providerCard: {
    borderRadius: 12,
    padding: space(2),
    backgroundColor: colors.slate2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.slate3,
  },
  scrollContent: {
    paddingTop: space(2),
    paddingBottom: space(3),
    paddingHorizontal: space(2),
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space(2),
  },
}));
