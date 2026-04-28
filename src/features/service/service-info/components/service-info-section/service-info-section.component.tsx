import { ReactNode } from "react";
import { StyleSheet } from "react-native-unistyles";

import { Flex, Typography } from "@/components";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function ServiceInfoSection({ title, children }: SectionProps) {
  return (
    <Flex gap={1.5} style={styles.card}>
      <Typography size="text-sm" weight="semibold" color="secondary">
        {title}
      </Typography>
      {children}
    </Flex>
  );
}

type RowProps = {
  label: string;
  value: string;
};

export function ServiceInfoRow({ label, value }: RowProps) {
  return (
    <Flex gap={0.5} direction="column">
      <Typography size="text-xs" color="secondary">
        {label}
      </Typography>
      <Typography size="text-sm" numberOfLines={8}>
        {value}
      </Typography>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    padding: space(2),
    borderColor: colors.slate4,
    backgroundColor: colors.background,
  },
}));
