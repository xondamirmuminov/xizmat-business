import { Image } from "expo-image";
import { View, Linking } from "react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Chip, Flex, Typography } from "@/components";
import { BusinessType, LocalizedTextType } from "@/types";
import { formatPhoneNumberForDisplay } from "@/lib/helpers";
import {
  PhoneIcon,
  MapPinIcon,
  ClockAlertIcon,
  ImagePlaceholder,
  AvatarPlaceholder,
  CircleCheckFilledIcon,
} from "@/assets";

type Props = {
  business?: BusinessType;
  locale: keyof LocalizedTextType;
};

export function CustomerPreviewHeader({ locale, business }: Props) {
  const { t } = useTranslation();

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const categoryLine = business?.categories
    ?.map((c) => c.title?.[locale] ?? c.title?.en)
    .filter(Boolean)
    .join(", ");

  return (
    <View>
      <Flex style={styles.header}>
        <Image
          contentFit="cover"
          style={styles.thumbnail}
          placeholderContentFit="cover"
          placeholder={ImagePlaceholder}
          source={{
            uri: business?.thumbnail,
          }}
        />
        <Flex
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          style={styles.thumbnailContent}
        >
          <View style={styles.logoWrapper}>
            <Image
              contentFit="cover"
              style={styles.logo}
              placeholderContentFit="cover"
              placeholder={AvatarPlaceholder}
              source={{
                uri: business?.logo,
              }}
            />
          </View>
          {business?.isProviderAvailable ? (
            <Chip size="sm" color="success" icon={<CircleCheckFilledIcon />}>
              {t("status.available_now")}
            </Chip>
          ) : (
            <Chip size="sm" color="warning" icon={<ClockAlertIcon />}>
              {t("status.not_available")}
            </Chip>
          )}
        </Flex>
      </Flex>
      <View style={styles.paddingContainer}>
        <Flex gap={2} alignItems="flex-start">
          <Typography weight="semibold" size="display-xs">
            {business?.name}
          </Typography>
          {categoryLine ? (
            <Typography size="text-sm" color="secondary" numberOfLines={2}>
              {categoryLine}
            </Typography>
          ) : null}
          <Flex gap={1.5}>
            <Flex gap={1} direction="row" alignItems="center">
              <MapPinIcon style={styles.infoIcon} />
              <Typography size="text-sm" weight="medium" color="secondary">
                {business?.address}
              </Typography>
            </Flex>
            <Flex gap={1} direction="row" alignItems="center">
              <PhoneIcon style={styles.infoIcon} />
              <Flex
                gap={1.5}
                flexWrap="wrap"
                direction="row"
                alignItems="center"
              >
                {business?.phoneNumbers?.map((phone) => (
                  <Typography
                    key={phone}
                    size="text-sm"
                    weight="medium"
                    color="secondary"
                    onPress={() => handleCall(phone)}
                  >
                    {formatPhoneNumberForDisplay(phone)}
                  </Typography>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  header: {
    position: "relative",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  paddingContainer: {
    paddingTop: space(7),
    paddingInline: space(2),
  },
  infoIcon: {
    width: 18,
    height: 18,
    color: colors.textSecondary,
  },
  thumbnailContent: {
    bottom: -44,
    width: "100%",
    position: "absolute",
    paddingInline: space(2),
  },
  thumbnail: {
    height: 180,
    width: "100%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  logoWrapper: {
    padding: 3,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.slate8,
    backgroundColor: colors.background,
  },
}));
