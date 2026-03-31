import { useRef, useEffect } from "react";
import { StyleSheet } from "react-native-unistyles";
import { View, Animated, DimensionValue } from "react-native";

import { SkeletonPropsType } from "./types";

export function Skeleton({
  style,
  height,
  width = "100%",
  typographySize,
  animated = false,
  radius = "rounded",
}: SkeletonPropsType) {
  styles.useVariants({ radius, size: typographySize });
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 0.3,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [animated, pulseAnimation]);

  return (
    <View style={[styles.text(width, height), style]}>
      <Animated.View
        style={[
          styles.skeleton,
          {
            opacity: animated ? pulseAnimation : 1,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  skeleton: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.slate3,
  },
  text: (width: DimensionValue, height?: DimensionValue) => ({
    width,
    height,
    overflow: "hidden",
    variants: {
      radius: {
        rounded: { borderRadius: 6 },
        circular: { borderRadius: 9999 },
      },
      size: {
        "text-xs": { height: 18 },
        "text-sm": { height: 20 },
        "text-md": { height: 24 },
        "text-lg": { height: 28 },
        "text-xl": { height: 30 },
        "display-xs": { height: 32 },
        "display-sm": { height: 38 },
        "display-md": { height: 44 },
        "display-lg": { height: 60 },
        "display-xl": { height: 72 },
      },
    },
  }),
}));
