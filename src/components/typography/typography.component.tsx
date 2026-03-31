import { Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { TypographyProps } from "./types";
import { getFontFamily } from "./helpers";

export function Typography({
  style,
  children,
  italic = false,
  align = "left",
  size = "text-md",
  weight = "regular",
  color = "textPrimary",
  ...props
}: TypographyProps) {
  styles.useVariants({ size, color, align, weight });

  return (
    <Text style={[styles.text(italic), style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create((theme) => ({
  text: (italic: boolean) => ({
    variants: {
      align: {
        left: { textAlign: "left" },
        right: { textAlign: "right" },
        center: { textAlign: "center" },
      },
      weight: {
        bold: { fontFamily: getFontFamily({ italic, weight: "bold" }) },
        medium: { fontFamily: getFontFamily({ italic, weight: "medium" }) },
        regular: { fontFamily: getFontFamily({ italic, weight: "regular" }) },
        semibold: { fontFamily: getFontFamily({ italic, weight: "semibold" }) },
      },
      color: {
        error: { color: theme.colors.red11 },
        info: { color: theme.colors.blue11 },
        success: { color: theme.colors.green11 },
        warning: { color: theme.colors.amber11 },
        primary: { color: theme.colors.primary11 },
        secondary: { color: theme.colors.textSecondary },
        textPrimary: { color: theme.colors.textPrimary },
      },
      size: {
        "text-xs": { fontSize: 12, lineHeight: 18 },
        "text-sm": { fontSize: 14, lineHeight: 20 },
        "text-md": { fontSize: 16, lineHeight: 24 },
        "text-lg": { fontSize: 18, lineHeight: 28 },
        "text-xl": { fontSize: 20, lineHeight: 30 },
        "display-xs": { fontSize: 24, lineHeight: 32 },
        "display-sm": { fontSize: 30, lineHeight: 38 },
        "display-md": { fontSize: 36, lineHeight: 44 },
        "display-lg": { fontSize: 48, lineHeight: 60 },
        "display-xl": { fontSize: 60, lineHeight: 72 },
      },
    },
  }),
}));
