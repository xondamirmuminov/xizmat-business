import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { renderIcon } from "@/lib/helpers";

import { ChipPropsType } from "./types";
import { Typography, TypographySizeEnum } from "../typography";

export function Chip({
  icon,
  style,
  onPress,
  children,
  iconStyle,
  size = "md",
  color = "secondary",
}: ChipPropsType) {
  styles.useVariants({ size, color });

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      {renderIcon({
        icon,
        style: [styles.icon, iconStyle],
      })}
      <Typography
        weight="medium"
        color="textPrimary"
        style={styles.title}
        size={("text-" + size) as TypographySizeEnum}
      >
        {children}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  title: {},
  icon: {
    variants: {
      size: {
        md: {
          width: 20,
          height: 20,
        },
        sm: {
          width: 16,
          height: 16,
        },
        xs: {
          width: 14,
          height: 14,
        },
        lg: {
          width: 24,
          height: 24,
        },
      },
      color: {
        info: { color: colors.info },
        error: {
          color: colors.error,
        },
        warning: {
          color: colors.warning,
        },
        primary: {
          color: colors.primary,
        },
        success: {
          color: colors.success,
        },
        secondary: {
          color: colors.textPrimary,
        },
      },
    },
  },
  container: {
    width: "auto",
    borderWidth: 1,
    borderRadius: 99,
    alignItems: "center",
    flexDirection: "row",
    variants: {
      size: {
        xs: {
          gap: 4,
          paddingBlock: 2,
          paddingInline: 6,
        },
        sm: {
          gap: 6,
          paddingBlock: 4,
          paddingInline: 6,
        },
        lg: {
          gap: 8,
          paddingBlock: 8,
          paddingInline: 10,
        },
        md: {
          gap: 8,
          paddingBlock: 6,
          paddingInline: space(1),
        },
      },
      color: {
        warning: { borderColor: colors.amber5, backgroundColor: colors.amber2 },
        error: {
          borderColor: colors.red5,
          backgroundColor: colors.red2,
        },
        info: {
          borderColor: colors.blue5,
          backgroundColor: colors.blue2,
        },
        success: {
          borderColor: colors.green5,
          backgroundColor: colors.green2,
        },
        secondary: {
          borderColor: colors.slate5,
          backgroundColor: colors.slate2,
        },
        primary: {
          borderColor: colors.primary5,
          backgroundColor: colors.primary2,
        },
      },
    },
  },
}));
