import { ReactNode } from "react";
import { StyleProp, TextProps } from "react-native";

export type TypographySizeEnum =
  | "text-xs"
  | "text-sm"
  | "text-md"
  | "text-lg"
  | "text-xl"
  | "display-xs"
  | "display-sm"
  | "display-md"
  | "display-lg"
  | "display-xl";
export type TypographyWeightEnum = "bold" | "medium" | "regular" | "semibold";
export type TypographyColorEnum =
  | "info"
  | "error"
  | "primary"
  | "success"
  | "warning"
  | "secondary"
  | "textPrimary";
export type TypographyAlignEnum = "left" | "right" | "center";

export type TypographyProps = {
  italic?: boolean;
  children?: ReactNode;
  style?: StyleProp<any>;
  size?: TypographySizeEnum;
  align?: TypographyAlignEnum;
  color?: TypographyColorEnum;
  weight?: TypographyWeightEnum;
} & TextProps;
