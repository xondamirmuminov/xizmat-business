import { Image } from "expo-image";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { BusinessType } from "@/types";
import { Flex, Typography } from "@/components";
import { CheckIcon, ImagePlaceholder } from "@/assets";

type Props = {
  isSelected: boolean;
  onSelect: VoidFunction;
  business: BusinessType;
};

export function BusinessSelectionCard({
  onSelect,
  business,
  isSelected,
}: Props) {
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.card, isSelected && styles.selectedCard]}
    >
      <Flex
        gap={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex gap={2} flexShrink={1} direction="row" alignItems="center">
          <Image
            contentFit="cover"
            style={styles.image}
            placeholderContentFit="cover"
            placeholder={ImagePlaceholder}
            source={{ uri: business?.logo }}
          />
          <Flex flexShrink={1}>
            <Typography weight="medium" numberOfLines={1} ellipsizeMode="tail">
              {business?.name}
            </Typography>
            <Typography size="text-sm" color="secondary" numberOfLines={1}>
              {business?.address}
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
