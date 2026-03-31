import { StyleProp } from "react-native";
import { ReactNode, ReactElement } from "react";

import { IconPropsType } from "@/types";

export type ButtonRadiusEnum = "rounded" | "circular";
export type ButtonSizeEnum = "sm" | "lg" | "md" | "xl";
export type ButtonStateEnum = "press" | "default" | "disabled";
export type ButtonVariantEnum = "text" | "ghost" | "filled" | "outlined";
export type ButtonColorEnum =
  | "info"
  | "error"
  | "primary"
  | "success"
  | "warning"
  | "secondary";

export type ButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
  size?: ButtonSizeEnum;
  style?: StyleProp<any>;
  onPress?: VoidFunction;
  color?: ButtonColorEnum;
  radius?: ButtonRadiusEnum;
  iconStyle?: StyleProp<any>;
  variant?: ButtonVariantEnum;
  endIcon?: ReactElement<IconPropsType>;
  startIcon?: ReactElement<IconPropsType>;
};
