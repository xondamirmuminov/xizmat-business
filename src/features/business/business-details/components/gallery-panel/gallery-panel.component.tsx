import { Image } from "expo-image";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { ImagePlaceholder } from "@/assets";
import { Flex, Empty, Typography } from "@/components";

type Props = {
  images: string[];
};

export function GalleryPanel({ images }: Props) {
  const { t } = useTranslation();

  if (!images?.length) {
    return (
      <Flex gap={1}>
        <View style={styles.paddingContainer}>
          <Typography size="text-lg" weight="semibold">
            {t("business_details.gallery")}
          </Typography>
        </View>
        <Empty />
      </Flex>
    );
  }

  return (
    <Flex gap={1}>
      <View style={styles.paddingContainer}>
        <Typography size="text-lg" weight="semibold">
          {t("business_details.gallery")}
        </Typography>
      </View>
      <Flex direction="row" flexWrap="wrap" style={styles.grid}>
        {images.map((photo) => (
          <View key={photo} style={styles.photoCell}>
            <Image
              contentFit="cover"
              style={styles.photo}
              source={{ uri: photo }}
              placeholderContentFit="cover"
              placeholder={ImagePlaceholder}
            />
          </View>
        ))}
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space }) => ({
  grid: {
    paddingHorizontal: space(1),
  },
  paddingContainer: {
    paddingInline: space(2),
  },
  photoCell: {
    width: "50%",
    padding: space(1),
  },
  photo: {
    height: 180,
    width: "100%",
    borderRadius: 10,
  },
}));
