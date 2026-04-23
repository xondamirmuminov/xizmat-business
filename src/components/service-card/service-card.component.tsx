import { Image } from "expo-image";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { ClockIcon, ImagePlaceholder } from "@/assets";
import { ServiceType, LocalizedTextType } from "@/types";

import { Flex } from "../flex";
import { Typography } from "../typography";

export function ServiceCard({ service }: { service: ServiceType }) {
  const { i18n } = useTranslation();
  const locale = i18n.language as keyof LocalizedTextType;

  return (
    <Flex style={styles.card}>
      <Link href={{ pathname: "/services/[id]", params: { id: service?._id } }}>
        <Flex
          gap={2}
          direction="row"
          alignItems="center"
          style={styles.cardContent}
        >
          <Image
            contentFit="cover"
            style={styles.image}
            placeholderContentFit="cover"
            placeholder={ImagePlaceholder}
            source={{
              uri: service?.primaryImage,
            }}
          />

          <Flex flex={1} gap={0.5} style={{ overflow: "hidden" }}>
            <Typography weight="medium" numberOfLines={1}>
              {service?.title[locale]}
            </Typography>
            <Flex gap={0.5}>
              <Flex gap={0.5} direction="row" alignItems="center">
                <ClockIcon style={styles.infoItemIcon} />
                <Typography size="text-xs" numberOfLines={1} color="secondary">
                  ~ {service?.durationMinutes} min
                </Typography>
              </Flex>
            </Flex>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography size={"text-md"} numberOfLines={1}>
                {service?.price?.toLocaleString("uz-UZ", {
                  currency: "UZS",
                  style: "currency",
                  minimumFractionDigits: 0,
                })}
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  button: { minWidth: 88 },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoItemIcon: {
    width: 14,
    height: 14,
    color: colors.textSecondary,
  },
  cardContent: {
    height: "100%",
    maxWidth: "100%",
    padding: space(1.5),
    paddingBottom: space(1.2),
  },
  card: {
    height: "auto",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    borderColor: colors.slate4,
    backgroundColor: colors.background,
    boxShadow: `${colors.slate3} 0px 4px 12px`,
  },
}));
