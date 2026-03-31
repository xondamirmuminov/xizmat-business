import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { DividerPropsType } from "./types";

export function Divider({
  color,
  size = 1,
  space = 16,
  orientation = "horizontal",
}: DividerPropsType) {
  styles.useVariants({ orientation });

  return <View style={styles.divider(size, space, color)}></View>;
}

const styles = StyleSheet.create((theme) => ({
  divider: (size: number, space: number, color?: string) => ({
    backgroundColor: color || theme.colors.slate4,
    variants: {
      orientation: {
        vertical: { width: size, height: "100%", marginInline: space },
        horizontal: { height: size, width: "100%", marginBlock: space },
      },
    },
  }),
}));
