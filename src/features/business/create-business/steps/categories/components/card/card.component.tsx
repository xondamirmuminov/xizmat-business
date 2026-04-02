import { Image } from "expo-image";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Flex, Typography } from "@/components";
import { CheckIcon, ImagePlaceholder } from "@/assets";
import { CategoryType, LocalizedTextType } from "@/types";

type Props = {
  isSelected: boolean;
  category: CategoryType;
  onSelect: (id: string) => void;
};

export function BusinessFormCategoryCard({
  category,
  onSelect,
  isSelected,
}: Props) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as keyof LocalizedTextType;

  return (
    <Pressable
      onPress={() => onSelect(category?._id)}
      style={[styles.card, isSelected && styles.selectedCard]}
    >
      <Flex
        gap={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex gap={2} direction="row" alignItems="center">
          <Image
            contentFit="cover"
            style={styles.image}
            placeholderContentFit="cover"
            placeholder={ImagePlaceholder}
            source={{ uri: category?.image }}
          />
          <Flex>
            <Typography weight="medium" numberOfLines={1} ellipsizeMode="tail">
              {category?.title[locale]}
            </Typography>
            <Typography size="text-sm" color="secondary">
              {category?.childrenCount}{" "}
              {t("create_business.steps.categories.categories_count")}
            </Typography>
          </Flex>
        </Flex>
        {isSelected && <CheckIcon style={styles.checkIcon} />}
      </Flex>
    </Pressable>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  checkIcon: {
    width: 20,
    height: 20,
    color: colors.primary,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary2,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: space(1),
    paddingRight: space(2),
    borderColor: colors.slate4,
  },
}));
