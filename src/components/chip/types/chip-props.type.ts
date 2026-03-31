import { StyleProp } from "react-native";
import { ReactNode, ReactElement } from "react";

import { IconPropsType } from "@/types";

export type ChipSizeEnum = "xs" | "sm" | "lg" | "md";
export type ChipColorEnum =
  | "info"
  | "error"
  | "primary"
  | "success"
  | "warning"
  | "secondary";

export type ChipPropsType = {
  size?: ChipSizeEnum;
  children?: ReactNode;
  color?: ChipColorEnum;
  style?: StyleProp<any>;
  onPress?: VoidFunction;
  iconStyle?: StyleProp<any>;
  icon?: ReactElement<IconPropsType>;
};
