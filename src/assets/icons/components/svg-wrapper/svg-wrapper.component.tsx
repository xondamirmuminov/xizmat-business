 
import Svg from "react-native-svg";
import { StyleSheet } from "react-native";
import { Children, ReactNode, cloneElement } from "react";
import { SvgProps } from "react-native-svg/lib/typescript/ReactNativeSVG";

import { IconPropsType } from "@/types";

export function SvgWrapper({
  size,
  style,
  filled = false,
  color: defaultColor,
  ...props
}: IconPropsType & { filled?: boolean; children: ReactNode } & SvgProps) {
  const flattenedStyle = StyleSheet.flatten(style) || {};

  const width = size ?? flattenedStyle?.width ?? 24;
  const height = size ?? flattenedStyle?.height ?? 24;
  const color = flattenedStyle?.color ?? defaultColor;

  return (
    <Svg
      width={width}
      style={style}
      height={height}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? color : "none"}
      stroke={filled ? "none" : color}
      strokeWidth={props.strokeWidth ?? (filled ? 0 : 2)}
      {...props}
    >
      {Children.map(props.children, (child: any) =>
        cloneElement(child, {
          fill: filled ? (child.props.fill ?? color) : "none",
          stroke: filled ? "none" : (child.props.stroke ?? color),
        }),
      )}
    </Svg>
  );
}
