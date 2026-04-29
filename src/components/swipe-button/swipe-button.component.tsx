import { StyleSheet } from "react-native-unistyles";
import { View, ViewStyle, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import React, {
  useMemo,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";
import Animated, {
  runOnJS,
  withSpring,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { CheckIcon, ChevronRightIcon } from "@/assets";

const THUMB_SIZE = 52;
const PADDING = 4;
const DEFAULT_WIDTH = Dimensions.get("window").width - 64;

type SlideToConfirmProps = {
  label?: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
  fillColor?: string;
  disabled?: boolean;
  trackColor?: string;
  thumbColor?: string;
  confirmedText?: string;
  onConfirm?: () => void;
  ref?: React.RefObject<null | { reset: VoidFunction }>;
};

const springConfig = {
  mass: 0.35,
  damping: 20,
  stiffness: 260,
};

export default function SlideToConfirm({
  ref,
  style,
  onConfirm,
  height = 60,
  disabled = false,
  width = DEFAULT_WIDTH,
  fillColor = "#00b7b5",
  trackColor = "#00b7b5",
  thumbColor = "#FFFFFF",
  label = "Slide to confirm",
  confirmedText = "Confirmed",
}: SlideToConfirmProps) {
  styles.useVariants({ disabled });

  const maxSlide = width - THUMB_SIZE - PADDING * 2;
  const minFillWidth = THUMB_SIZE + PADDING * 2;

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const locked = useSharedValue(0);

  const triggerConfirm = useCallback(() => {
    onConfirm?.();
  }, [onConfirm]);

  useEffect(() => {
    if (disabled) {
      translateX.value = 0;
      locked.value = 0;
    }
  }, [disabled, translateX, locked]);

  const reset = useCallback(() => {
    locked.value = 0;
    translateX.value = withSpring(0, springConfig);
  }, [locked, translateX]);

  useImperativeHandle(
    ref,
    () => ({
      reset,
    }),
    [reset],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!disabled)
        .activeOffsetX([-14, 14])
        .failOffsetY([-22, 22])
        .onBegin(() => {
          if (locked.value === 1) {
            return;
          }
          startX.value = translateX.value;
        })
        .onUpdate((e) => {
          if (locked.value === 1) {
            return;
          }
          const next = Math.max(
            0,
            Math.min(maxSlide, startX.value + e.translationX),
          );
          translateX.value = next;
        })
        .onEnd(() => {
          if (locked.value === 1) {
            return;
          }
          if (translateX.value >= maxSlide * 0.85) {
            translateX.value = withSpring(maxSlide, springConfig, (finished) => {
              if (finished) {
                locked.value = 1;
                if (onConfirm) {
                  runOnJS(triggerConfirm)();
                }
              }
            });
          } else {
            translateX.value = withSpring(0, springConfig);
          }
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- shared values are stable refs
    [disabled, maxSlide, triggerConfirm],
  );

  const fillStyle = useAnimatedStyle(() => ({
    width:
      minFillWidth +
      (translateX.value / Math.max(maxSlide, 1)) * (width - minFillWidth),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, maxSlide * 0.4],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const confirmedLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [maxSlide * 0.5, maxSlide],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, maxSlide * 0.3],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [maxSlide * 0.85, maxSlide],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

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
              left: 0,
              position: "absolute",
              borderRadius: height / 2,
              backgroundColor: fillColor,
            },
            styles.fill,
            fillStyle,
          ]}
        />

        <Animated.Text numberOfLines={1} style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>

        <Animated.Text
          numberOfLines={1}
          style={[styles.label, confirmedLabelStyle]}
        >
          {confirmedText}
        </Animated.Text>

        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              {
                elevation: 4,
                left: PADDING,
                shadowRadius: 6,
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                shadowOpacity: 0.08,
                shadowColor: "#000",
                position: "absolute",
                backgroundColor: thumbColor,
                borderRadius: THUMB_SIZE / 2,
                top: (height - THUMB_SIZE) / 2,
                shadowOffset: { width: 0, height: 2 },
              },
              styles.thumb,
              thumbStyle,
            ]}
          >
            <Animated.View style={[styles.iconWrapper, arrowStyle]}>
              <ChevronRightIcon style={styles.icon} />
            </Animated.View>

            <Animated.View style={[styles.iconWrapper, checkStyle]}>
              <CheckIcon style={[styles.icon, styles.check]} />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  check: {
    color: colors.success,
  },
  iconWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    top: 0,
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
    color: colors.black,
    variants: {
      disabled: {
        true: {
          color: colors.slate8,
        },
      },
    },
  },
  thumb: {
    alignItems: "center",
    justifyContent: "center",
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
}));
