import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import {
  View,
  Animated,
  ViewStyle,
  Dimensions,
  PanResponder,
} from "react-native";

import { CheckIcon, ChevronRightIcon } from "@/assets";

interface SlideToConfirmProps {
  label?: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
  fillColor?: string;
  disabled?: boolean;
  trackColor?: string;
  thumbColor?: string;
  onConfirm?: () => void;
}

const THUMB_SIZE = 52;
const PADDING = 4;
const WIDTH = Dimensions.get("window").width - 64;

export default function SlideToConfirm({
  style,
  onConfirm,
  height = 60,
  width = WIDTH,
  disabled = false,
  fillColor = "#00b7b5",
  trackColor = "#00b7b5",
  thumbColor = "#FFFFFF",
  label = "Slide to confirm",
}: SlideToConfirmProps) {
  styles.useVariants({ disabled });
  const maxSlide = width - THUMB_SIZE - PADDING * 2;

  const translateX = useRef(new Animated.Value(0)).current;
  const [confirmed, setConfirmed] = useState(false);
  const [dragging, setDragging] = useState(false);

  const fillWidth = translateX.interpolate({
    extrapolate: "clamp",
    inputRange: [0, maxSlide],
    outputRange: [THUMB_SIZE + PADDING * 2, width],
  });

  const labelOpacity = translateX.interpolate({
    outputRange: [1, 0],
    extrapolate: "clamp",
    inputRange: [0, maxSlide * 0.4],
  });

  const confirmedLabelOpacity = translateX.interpolate({
    outputRange: [0, 1],
    extrapolate: "clamp",
    inputRange: [maxSlide * 0.5, maxSlide],
  });

  const checkOpacity = translateX.interpolate({
    outputRange: [0, 1],
    extrapolate: "clamp",
    inputRange: [maxSlide * 0.85, maxSlide],
  });

  const arrowOpacity = translateX.interpolate({
    outputRange: [1, 0],
    extrapolate: "clamp",
    inputRange: [0, maxSlide * 0.3],
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !confirmed && !disabled,
      onStartShouldSetPanResponder: () => !confirmed && !disabled,

      onPanResponderGrant: () => {
        setDragging(true);
        translateX.stopAnimation();
      },

      onPanResponderMove: (_, gestureState) => {
        const newX = Math.max(0, Math.min(gestureState.dx, maxSlide));
        translateX.setValue(newX);
      },

      onPanResponderRelease: (_, gestureState) => {
        setDragging(false);
        const currentX = Math.max(0, Math.min(gestureState.dx, maxSlide));

        if (currentX >= maxSlide * 0.85) {
          // Snap to confirmed
          Animated.spring(translateX, {
            bounciness: 6,
            toValue: maxSlide,
            useNativeDriver: false,
          }).start(() => {
            setConfirmed(true);
            onConfirm?.();
          });
        } else {
          // Snap back to start
          Animated.spring(translateX, {
            toValue: 0,
            bounciness: 8,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={[style]}>
      <View
        style={[
          {
            width,
            height,
            borderRadius: height / 2,
            backgroundColor: trackColor,
          },
          styles.track,
        ]}
      >
        <Animated.View
          style={[
            {
              height,
              width: fillWidth,
              borderRadius: height / 2,
              backgroundColor: fillColor,
            },
            styles.fill,
          ]}
        />

        <Animated.Text
          numberOfLines={1}
          style={[styles.label, { opacity: labelOpacity }]}
        >
          {label}
        </Animated.Text>

        <Animated.Text
          numberOfLines={1}
          style={[styles.label, { opacity: confirmedLabelOpacity }]}
        >
          Confirmed
        </Animated.Text>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            {
              left: PADDING,
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              backgroundColor: thumbColor,
              transform: [{ translateX }],
              borderRadius: THUMB_SIZE / 2,
              top: (height - THUMB_SIZE) / 2,
              shadowOpacity: dragging ? 0.18 : 0.08,
            },
            styles.thumb,
          ]}
        >
          <Animated.View
            style={[
              styles.iconWrapper,
              {
                opacity: arrowOpacity,
              },
            ]}
          >
            <ChevronRightIcon style={styles.icon} />
          </Animated.View>

          <Animated.View
            style={[styles.iconWrapper, { opacity: checkOpacity }]}
          >
            <CheckIcon style={[styles.icon, styles.check]} />
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  check: {
    color: colors.success,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    top: 0,
    left: 0,
    position: "absolute",
    variants: {
      disabled: {
        true: {
          backgroundColor: colors.slate3,
        },
      },
    },
  },
  track: {
    overflow: "hidden",
    justifyContent: "center",
    variants: {
      disabled: {
        true: {
          backgroundColor: colors.slate3,
        },
      },
    },
  },
  icon: {
    width: 22,
    height: 22,
    position: "absolute",
    color: colors.textPrimary,
    variants: {
      disabled: {
        true: {
          color: colors.slate8,
        },
      },
    },
  },
  confirmedText: {
    fontSize: 13,
    marginTop: 14,
    fontWeight: "500",
    textAlign: "center",
    color: colors.success,
    variants: {
      disabled: {
        true: {
          color: colors.slate7,
        },
      },
    },
  },
  label: {
    fontSize: 15,
    width: "100%",
    letterSpacing: 0.3,
    textAlign: "center",
    color: colors.white,
    position: "absolute",
    fontFamily: "Inter Semibold",
    variants: {
      disabled: {
        true: {
          color: colors.slate7,
        },
      },
    },
  },
  thumb: {
    elevation: 4,
    shadowRadius: 6,
    shadowColor: "#000",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    variants: {
      disabled: {
        true: {
          elevation: 0,
          shadowOpacity: 0,

          backgroundColor: colors.slate4,
        },
      },
    },
  },
}));
