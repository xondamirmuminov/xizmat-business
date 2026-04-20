import { Image } from "expo-image";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { CheckIcon, ImagePlaceholder } from "@/assets";

import { Flex } from "../flex";
import { Typography } from "../typography";

type Props = {
  isSelected: boolean;
  hideImage?: boolean;
  onSelect: VoidFunction;
  item: { title: string; image?: string; subTitle?: string };
};

export function SelectableCard({
  item,
  onSelect,
  isSelected,
  hideImage = false,
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
        <Flex gap={2} direction="row" alignItems="center">
          {!hideImage && (
            <Image
              contentFit="cover"
              style={styles.image}
              source={{ uri: item?.image }}
              placeholderContentFit="cover"
              placeholder={ImagePlaceholder}
            />
          )}
          <Flex>
            <Typography weight="medium" numberOfLines={1} ellipsizeMode="tail">
              {item?.title}
            </Typography>
            <Typography size="text-sm" color="secondary">
              {item?.subTitle}
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
    padding: space(1.5),
    paddingRight: space(2),
    borderColor: colors.slate4,
  },
}));
