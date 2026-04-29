import { StyleSheet } from "react-native-unistyles";

import type { IconPropsType } from "@/types";

import { CheckIcon } from "@/assets";
import { Flex, Typography } from "@/components";

type StatusRowProps = {
  label: string;
  checkIconStyle: NonNullable<IconPropsType["style"]>;
};

export function StatusRow({ label, checkIconStyle }: StatusRowProps) {
  return (
    <Flex
      gap={1.25}
      direction="row"
      style={styles.row}
      alignItems="flex-start"
    >
      <CheckIcon size={18} style={checkIconStyle} />
      <Typography size="text-sm" style={styles.label}>
        {label}
      </Typography>
    </Flex>
  );
}

const styles = StyleSheet.create({
  row: {
    maxWidth: "100%",
  },
  label: {
    flex: 1,
    flexShrink: 1,
    lineHeight: 22,
    maxWidth: "100%",
  },
});
