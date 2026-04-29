import { View } from "react-native";
import { Children, type ReactNode } from "react";
import { StyleSheet } from "react-native-unistyles";

import { Flex, Typography } from "@/components";

type ProfileSettingsSectionProps = {
  label?: string;
  children: ReactNode;
};

export function ProfileSettingsSection({
  label,
  children,
}: ProfileSettingsSectionProps) {
  const childArray = Children.toArray(children).filter(Boolean);

  return (
    <Flex gap={0.5}>
      {label ? (
        <Typography
          size="text-sm"
          color="secondary"
          style={styles.sectionLabel}
        >
          {label}
        </Typography>
      ) : null}
      <View style={styles.card}>
        {childArray.map((child: ReactNode, index: number) => (
          <View
            key={index}
            style={index > 0 ? styles.rowDivider : undefined}
          >
            {child}
          </View>
        ))}
      </View>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  sectionLabel: {
    marginLeft: space(0.25),
    marginBottom: space(0.5),
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.slate2,
  },
  rowDivider: {
    borderTopColor: colors.slate4,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
}));
