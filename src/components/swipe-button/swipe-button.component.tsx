import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import {
  Text,
  View,
  Animated,
  ViewStyle,
  Dimensions,
  PanResponder,
} from "react-native";

import { CheckIcon, ChevronRightIcon } from "@/assets";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SlideToConfirmProps {
  label?: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
  fillColor?: string;
  trackColor?: string;
  thumbColor?: string;
  onConfirm?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const THUMB_SIZE = 52;
const PADDING = 4;
const WIDTH = Dimensions.get("window").width - 64;

// ─── Component ────────────────────────────────────────────────────────────────

export default function SlideToConfirm({
  style,
  onConfirm,
  height = 60,
  width = WIDTH,
  fillColor = "#16bcba",
  trackColor = "#00b7b5",
  thumbColor = "#FFFFFF",
  label = "Slide to confirm",
}: SlideToConfirmProps) {
  const maxSlide = width - THUMB_SIZE - PADDING * 2;

  const translateX = useRef(new Animated.Value(0)).current;
  const [confirmed, setConfirmed] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Derived animated values
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

  // ─── PanResponder ──────────────────────────────────────────────────────────

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !confirmed,
      onStartShouldSetPanResponder: () => !confirmed,

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

  // ─── Reset ─────────────────────────────────────────────────────────────────

  const reset = () => {
    setConfirmed(false);
    Animated.spring(translateX, {
      toValue: 0,
      bounciness: 8,
      useNativeDriver: false,
    }).start();
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={[style]}>
      {/* Track */}
      <View
        style={[
          styles.track,
          {
            width,
            height,
            borderRadius: height / 2,
            backgroundColor: trackColor,
          },
        ]}
      >
        {/* Animated fill */}
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              width: fillWidth,
              borderRadius: height / 2,
              backgroundColor: fillColor,
            },
          ]}
        />

        {/* Center label */}
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

        {/* Thumb */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
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
          ]}
        >
          {/* Arrow icon (shown at start) */}
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

          {/* Check icon (shown at end) */}
          <Animated.View
            style={[styles.iconWrapper, { opacity: checkOpacity }]}
          >
            <CheckIcon style={[styles.icon, styles.check]} />
          </Animated.View>
        </Animated.View>
      </View>

      {/* Confirmed state label + reset */}
      {/* {confirmed && (
        <Text onPress={reset} style={styles.confirmedText}>
          Confirmed! Tap to reset
        </Text>
      )} */}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create(({ colors }) => ({
  check: {
    color: colors.success,
  },
  fill: {
    top: 0,
    left: 0,
    position: "absolute",
  },
  track: {
    overflow: "hidden",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 22,
    height: 22,
    position: "absolute",
    color: colors.textPrimary,
  },
  confirmedText: {
    fontSize: 13,
    marginTop: 14,
    fontWeight: "500",
    textAlign: "center",
    color: colors.success,
  },
  label: {
    fontSize: 15,
    width: "100%",
    letterSpacing: 0.3,
    textAlign: "center",
    color: colors.white,
    position: "absolute",
    fontFamily: "Inter SemiBold",
  },
  thumb: {
    elevation: 4,
    shadowRadius: 6,
    shadowColor: "#000",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
  },
}));
