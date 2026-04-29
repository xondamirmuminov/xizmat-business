import type { ReactNode, ReactElement } from "react";

import { View, Pressable } from "react-native";
import { cloneElement, isValidElement } from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import type { IconPropsType } from "@/types";

import { ChevronRightIcon } from "@/assets";
import { Flex, Typography } from "@/components";

type RowVariant = "danger" | "default" | "warning";

type ProfileSettingsRowProps = {
  title: string;
  value?: string;
  onPress: () => void;
  variant?: RowVariant;
  showChevron?: boolean;
  endContent?: ReactNode;
  startIcon?: ReactElement<IconPropsType>;
  /** Overrides default secondary icon color (e.g. brand marks on Contact us) */
  startIconTint?: string;
};

export function ProfileSettingsRow({
  title,
  value,
  onPress,
  startIcon,
  startIconTint,
  endContent,
  showChevron = true,
  variant = "default",
}: ProfileSettingsRowProps) {
  const { theme } = useUnistyles();

  const isDanger = variant === "danger";
  const isWarning = variant === "warning";

  let iconColor = theme.colors.textSecondary;
  if (isDanger) {
    iconColor = theme.colors.error;
  } else if (isWarning) {
    iconColor = theme.colors.warning;
  } else if (startIconTint) {
    iconColor = startIconTint;
  }

  const titleColor = isDanger ? "error" : "textPrimary";

  const iconNode =
    startIcon && isValidElement(startIcon)
      ? cloneElement(startIcon as ReactElement<IconPropsType>, {
          color: iconColor,
          size: (startIcon as ReactElement<IconPropsType>).props.size ?? 22,
        })
      : null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.rowPressed]}
    >
      <Flex
        gap={1.5}
        direction="row"
        alignItems="center"
        style={styles.rowInner}
      >
        {iconNode ? <View style={styles.iconSlot}>{iconNode}</View> : null}
        <View style={styles.titleSlot}>
          <Typography weight="medium" numberOfLines={2} color={titleColor}>
            {title}
          </Typography>
        </View>
        {value ? (
          <View style={styles.valueSlot}>
            <Typography
              size="text-sm"
              color="secondary"
              numberOfLines={2}
              ellipsizeMode="tail"
              align="right"
            >
              {value}
            </Typography>
          </View>
        ) : (
          <View style={styles.grow} />
        )}
        {endContent}
        {showChevron ? (
          <ChevronRightIcon size={20} color={theme.colors.textSecondary} />
        ) : null}
      </Flex>
    </Pressable>
  );
}

const styles = StyleSheet.create(({ space }) => ({
  rowPressed: {
    opacity: 0.75,
  },
  titleSlot: {
    flexShrink: 0,
  },
  valueSlot: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    alignItems: "flex-end",
  },
  grow: {
    flex: 1,
    minWidth: space(0.5),
  },
  iconSlot: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  rowInner: {
    minHeight: 48,
    paddingHorizontal: space(2),
    paddingVertical: space(1.25),
  },
}));
