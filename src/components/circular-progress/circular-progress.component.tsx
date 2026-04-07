import React from "react";
import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { Svg, Circle, Text as SVGText } from "react-native-svg";

type Props = {
  size: number;
  text: string;
  textSize?: number;
  textColor?: string;
  strokeWidth: number;
  borderColor?: string;
  progressColor?: string;
  progressPercent: number;
};

export function CircularProgress({
  size,
  text,
  textColor,
  borderColor,
  strokeWidth,
  textSize = 10,
  progressColor,
  progressPercent,
}: Props) {
  const {
    theme: { colors },
  } = useUnistyles();

  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - progressPercent;

  return (
    <View>
      <Svg width={size} height={size}>
        <Circle
          r={radius}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          stroke={borderColor || colors.slate3}
          {...{ strokeWidth }}
        />
        <Circle
          r={radius}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
          strokeDasharray={`${circum} ${circum}`}
          stroke={progressColor || colors.primary}
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          {...{ strokeWidth }}
        />
        <SVGText
          x={size / 2}
          fontSize={textSize}
          textAnchor="middle"
          fontFamily="Inter Semibold"
          fill={textColor || colors.textPrimary}
          y={size / 2 + (textSize ? textSize / 2 - 1 : 5)}
        >
          {text}
        </SVGText>
      </Svg>
    </View>
  );
}
