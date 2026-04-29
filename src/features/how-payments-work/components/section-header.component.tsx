import type { ReactNode } from "react";

import { StyleSheet } from "react-native-unistyles";

import { Flex, Typography } from "@/components";

type SectionHeaderProps = {
  title: string;
  icon?: ReactNode;
};

export function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <Flex
      direction="row"
      gap={icon ? 1 : 0}
      alignItems="center"
      style={styles.root}
    >
      {icon ?? null}
      <Typography size="text-md" weight="semibold">
        {title}
      </Typography>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space }) => ({
  root: {
    marginBottom: space(0.25),
  },
}));
