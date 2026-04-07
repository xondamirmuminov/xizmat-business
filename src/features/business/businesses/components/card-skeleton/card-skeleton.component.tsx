import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Flex, Skeleton } from "@/components";

export function BusinessSelectionCardSkeleton() {
  return (
    <View style={[styles.card]}>
      <Flex
        gap={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex gap={2} direction="row" alignItems="center">
          <Skeleton style={styles.image} />
          <Flex flex={1} gap={0.5}>
            <Skeleton width="70%" typographySize="text-md" />
            <Skeleton width="40%" typographySize="text-sm" />
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    padding: space(1),
    paddingRight: space(2),
    borderColor: colors.slate4,
  },
}));
