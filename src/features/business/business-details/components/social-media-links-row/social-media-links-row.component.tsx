import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { View, Linking, Pressable, ScrollView } from "react-native";

import { Typography } from "@/components";
import { SocialMediaLinksType } from "@/types";
import {
  GlobeIcon,
  TiktokIcon,
  YoutubeIcon,
  FacebookIcon,
  TelegramIcon,
  InstagramIcon,
} from "@/assets";

const SOCIAL_ORDER: (keyof SocialMediaLinksType)[] = [
  "website",
  "instagram",
  "telegram",
  "facebook",
  "youtube",
  "tiktok",
];

const ICON_COLORS: Record<keyof SocialMediaLinksType, string> = {
  tiktok: "#FE2C55",
  website: "#64748b",
  youtube: "#FF0000",
  facebook: "#1877F2",
  telegram: "#229ED9",
  instagram: "#E4405F",
};

function normalizeExternalUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function buildEntries(links?: SocialMediaLinksType) {
  if (!links) {
    return [];
  }
  const out: { url: string; key: keyof SocialMediaLinksType }[] = [];
  for (const key of SOCIAL_ORDER) {
    const raw = links[key]?.trim();
    if (!raw) {
      continue;
    }
    out.push({ key, url: normalizeExternalUrl(raw) });
  }
  return out;
}

const KEY_TO_A11Y: Record<keyof SocialMediaLinksType, string> = {
  tiktok: "business_details.social_tiktok_a11y",
  website: "business_details.social_website_a11y",
  youtube: "business_details.social_youtube_a11y",
  facebook: "business_details.social_facebook_a11y",
  telegram: "business_details.social_telegram_a11y",
  instagram: "business_details.social_instagram_a11y",
};

const KEY_TO_LABEL: Record<keyof SocialMediaLinksType, string> = {
  tiktok: "business_details.social_label_tiktok",
  website: "business_details.social_label_website",
  youtube: "business_details.social_label_youtube",
  facebook: "business_details.social_label_facebook",
  telegram: "business_details.social_label_telegram",
  instagram: "business_details.social_label_instagram",
};

const KEY_TO_ICON = {
  tiktok: TiktokIcon,
  website: GlobeIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
} as const;

const ICON_SLOT = 22;
const ICON_SIZE = 15;

type Props = {
  links?: SocialMediaLinksType;
};

export function SocialMediaLinksRow({ links }: Props) {
  const { t } = useTranslation();
  const entries = buildEntries(links);

  if (entries.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {entries.map(({ key, url }) => {
        const Icon = KEY_TO_ICON[key];
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={t(KEY_TO_A11Y[key])}
            style={({ pressed }) => [
              styles.pill,
              pressed && styles.pillPressed,
            ]}
            onPress={() => {
              Linking.openURL(url).catch(() => {});
            }}
          >
            <View style={styles.iconSlot}>
              <Icon size={ICON_SIZE} color={ICON_COLORS[key]} />
            </View>
            <Typography
              size="text-xs"
              weight="medium"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.pillLabel}
            >
              {t(KEY_TO_LABEL[key])}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  pillPressed: {
    opacity: 0.82,
  },
  pillLabel: {
    flexShrink: 0,
    maxWidth: 112,
    color: colors.textPrimary,
  },
  iconSlot: {
    width: ICON_SLOT,
    height: ICON_SLOT,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    gap: space(0.75),
    alignItems: "center",
    flexDirection: "row",
    paddingRight: space(0.25),
  },
  pill: {
    borderRadius: 999,
    gap: space(0.625),
    alignItems: "center",
    flexDirection: "row",
    borderColor: colors.slate8,
    paddingVertical: space(0.375),
    backgroundColor: colors.surface,
    paddingHorizontal: space(0.875),
    borderWidth: StyleSheet.hairlineWidth,
  },
}));
