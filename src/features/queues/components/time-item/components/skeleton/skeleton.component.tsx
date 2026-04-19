import { View, StyleProp } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Flex, Skeleton } from "@/components";

type Props = {
  style?: StyleProp<any>;
};

export function ServiceDateTimePickerTimeItemSkeleton({ style }: Props) {
  return (
    <View style={[styles.timeItem, style]}>
      <Flex alignItems="center">
        <Skeleton animated width="80%" typographySize="text-md" />
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  timeItem: {
    flex: 1,
    minWidth: 90,
    borderWidth: 1,
    borderRadius: 8,
    paddingBlock: space(1),
    paddingInline: space(1),
    borderColor: colors.slate6,
    backgroundColor: colors.background,
  },
}));
