import { useLayoutEffect } from "react";
import { Linking, ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import {
  PhoneIcon,
  MailIcon,
  TelegramIcon,
  InstagramIcon,
  YoutubeIcon,
  LogoHorizontal,
} from "@/assets";
import { Flex, Typography } from "@/components";
import {
  ProfileSettingsSection,
  ProfileSettingsRow,
} from "@/features/business/business-profile";

import {
  CONTACT_BRAND_SINCE_YEAR,
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAILTO,
  CONTACT_INSTAGRAM_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_SOCIAL_HANDLE,
  CONTACT_SOCIAL_ICON_INSTAGRAM,
  CONTACT_SOCIAL_ICON_TELEGRAM,
  CONTACT_SOCIAL_ICON_YOUTUBE,
  CONTACT_TELEGRAM_URL,
  CONTACT_YOUTUBE_URL,
} from "./constants";
import { contactUsStyles as styles } from "./contact-us.styles";

export function ContactUs() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: t("profile.contact_us_title") });
  }, [navigation, t]);

  const openUrl = (url: string) => {
    void Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.scrollColumn}>
          <Flex gap={2}>
            <ProfileSettingsSection
              label={t("profile.contact_us_section_direct")}
            >
              <ProfileSettingsRow
                title={t("profile.contact_us_phone")}
                value={CONTACT_PHONE_DISPLAY}
                startIcon={<PhoneIcon />}
                onPress={() => openUrl(CONTACT_PHONE_TEL)}
              />
              <ProfileSettingsRow
                title={t("profile.contact_us_email")}
                value={CONTACT_EMAIL}
                startIcon={<MailIcon />}
                onPress={() => openUrl(CONTACT_EMAIL_MAILTO)}
              />
            </ProfileSettingsSection>

            <ProfileSettingsSection
              label={t("profile.contact_us_section_social")}
            >
              <ProfileSettingsRow
                title={t("profile.contact_us_telegram")}
                value={CONTACT_SOCIAL_HANDLE}
                startIcon={<TelegramIcon />}
                startIconTint={CONTACT_SOCIAL_ICON_TELEGRAM}
                onPress={() => openUrl(CONTACT_TELEGRAM_URL)}
              />
              <ProfileSettingsRow
                title={t("profile.contact_us_instagram")}
                value={CONTACT_SOCIAL_HANDLE}
                startIcon={<InstagramIcon />}
                startIconTint={CONTACT_SOCIAL_ICON_INSTAGRAM}
                onPress={() => openUrl(CONTACT_INSTAGRAM_URL)}
              />
              <ProfileSettingsRow
                title={t("profile.contact_us_youtube")}
                value={CONTACT_SOCIAL_HANDLE}
                startIcon={<YoutubeIcon />}
                startIconTint={CONTACT_SOCIAL_ICON_YOUTUBE}
                onPress={() => openUrl(CONTACT_YOUTUBE_URL)}
              />
            </ProfileSettingsSection>
          </Flex>

          <View style={styles.footerSpacer} />

          <Flex style={styles.brandFooter}>
            <View style={styles.brandLogoWrap}>
              <Image
                accessibilityIgnoresInvertColors
                accessibilityRole="image"
                accessibilityLabel={t("profile.contact_us_logo_a11y")}
                contentFit="contain"
                source={LogoHorizontal}
                style={styles.brandLogo}
              />
            </View>
            <Typography align="center" size="text-xs" color="secondary">
              {t("profile.contact_us_footer_since", {
                year: CONTACT_BRAND_SINCE_YEAR,
              })}
            </Typography>
          </Flex>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
