import { isNil, isString } from "lodash";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Text, View, Pressable, ActivityIndicator } from "react-native";

import { renderIcon } from "@/lib/helpers";

import { ButtonProps, ButtonStateEnum } from "./types";
import { getButtonColors, GetButtonColorReturnType } from "./helpers";

export function Button({
  style,
  endIcon,
  loading,
  onPress,
  children,
  disabled,
  startIcon,
  iconStyle,
  size = "md",
  fullWidth = false,
  color = "primary",
  radius = "rounded",
  variant = "filled",
}: ButtonProps) {
  const { theme } = useUnistyles();

  styles.useVariants({
    size,
    radius,
    variant,
  });

  const getButtonText = (colors: GetButtonColorReturnType) => {
    return isNil(startIcon) && isNil(endIcon) && loading ? (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="small" color={colors.color} />
      </View>
    ) : (
      <Text style={styles.title(colors)}>{children}</Text>
    );
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={styles.container(fullWidth)}
    >
      {({ pressed }) => {
        const state: ButtonStateEnum =
          disabled || loading
            ? "disabled"
            : // eslint-disable-next-line sonarjs/no-nested-conditional
              pressed
              ? "press"
              : "default";

        const colors = getButtonColors(theme, variant, color, state);

        return (
          <View
            style={[styles.button(colors, fullWidth, isNil(children)), style]}
          >
            {startIcon &&
              (!loading ? (
                renderIcon({
                  icon: startIcon,
                  color: colors.color,
                  style: { ...styles.icon, ...iconStyle },
                })
              ) : (
                <View style={styles.loadingWrapper}>
                  <ActivityIndicator size="small" color={colors.color} />
                </View>
              ))}
            {isString(children) ? getButtonText(colors) : children}
            {endIcon &&
              (!loading ? (
                renderIcon({
                  icon: endIcon,
                  color: colors.color,
                  style: { ...styles.icon, ...iconStyle },
                })
              ) : (
                <View style={styles.loadingWrapper}>
                  <ActivityIndicator size="small" color={colors.color} />
                </View>
              ))}
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create(() => ({
  container: (fullWidth: boolean) => ({
    flexShrink: 1,
    maxWidth: "100%",
    width: fullWidth ? "100%" : "auto",
  }),
  icon: {
    variants: {
      size: {
        sm: { width: 18, height: 18 },
        md: { width: 20, height: 20 },
        lg: { width: 20, height: 20 },
        xl: { width: 22, height: 22 },
      },
    },
  },
  loadingWrapper: {
    display: "flex",
    borderRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    variants: {
      size: {
        sm: { width: 18, height: 18 },
        md: { width: 20, height: 20 },
        lg: { width: 20, height: 20 },
        xl: { width: 22, height: 22 },
      },
    },
  },
  title: (colors: GetButtonColorReturnType) => {
    return {
      color: colors.color,
      fontFamily: "Inter Semibold",
      variants: {
        size: {
          sm: { fontSize: 12, lineHeight: 16 },
          lg: { fontSize: 16, lineHeight: 22 },
          md: { fontSize: 14, lineHeight: 18 },
          xl: { fontSize: 16, lineHeight: 22 },
        },
      },
    };
  },
  button: (
    colors: GetButtonColorReturnType,
    fullWidth: boolean,
    isIconButton: boolean,
  ) => {
    return {
      gap: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      color: colors?.color,
      boxSizing: "border-box",
      justifyContent: "center",
      width: fullWidth ? "100%" : "auto",
      variants: {
        radius: {
          rounded: { borderRadius: 8 },
          circular: { borderRadius: 9999 },
        },
        size: {
          sm: {
            height: 32,
            paddingBlock: 6,
            minWidth: isIconButton ? 32 : 106,
            paddingInline: isIconButton ? 6 : 10,
          },
          md: {
            height: 40,
            paddingBlock: 10,
            minWidth: isIconButton ? 40 : 110,
            paddingInline: isIconButton ? 8 : 16,
          },
          xl: {
            height: 48,
            paddingBlock: 12,
            minWidth: isIconButton ? 48 : 129,
            paddingInline: isIconButton ? 12 : 20,
          },
          lg: {
            height: 44,
            paddingBlock: 10,
            minWidth: isIconButton ? 44 : 125,
            paddingInline: isIconButton ? 10 : 18,
          },
        },
        variant: {
          text: {
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: colors?.borderColor,
            backgroundColor: colors?.backgroundColor,
          },
          ghost: {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: colors?.borderColor,
            backgroundColor: colors?.backgroundColor,
          },
          outlined: {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: colors?.borderColor,
            backgroundColor: colors?.backgroundColor,
          },
          filled: {
            borderWidth: 1,
            color: colors?.color,
            borderStyle: "solid",
            borderColor: colors?.borderColor,
            backgroundColor: colors?.backgroundColor,
          },
        },
      },
    };
  },
}));
