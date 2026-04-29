import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Flex, Typography } from "@/components";

type StepRowProps = {
  text: string;
  index: number;
};

export function StepRow({ text, index }: StepRowProps) {
  return (
    <Flex
      gap={1.25}
      direction="row"
      style={styles.row}
      alignItems="flex-start"
    >
      <View style={styles.badge}>
        <Typography weight="bold" size="text-xs" style={styles.badgeDigit}>
          {index}
        </Typography>
      </View>
      <Typography size="text-sm" style={styles.text}>
        {text}
      </Typography>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  row: {
    alignItems: "flex-start",
  },
  badgeDigit: {
    color: colors.slate11,
  },
  text: {
    flex: 1,
    flexShrink: 1,
    paddingTop: 1,
    lineHeight: 22,
    maxWidth: "100%",
  },
  badge: {
    marginTop: 2,
    height: space(3),
    borderRadius: 999,
    minWidth: space(3),
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.slate6,
    backgroundColor: colors.slate3,
    borderWidth: StyleSheet.hairlineWidth,
  },
}));
