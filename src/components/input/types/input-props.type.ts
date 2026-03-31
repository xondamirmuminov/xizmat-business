import { ReactElement } from "react";
import { StyleProp, TextInputProps } from "react-native";

import { IconPropsType } from "@/types";
import { ButtonProps } from "@/components/button";

export type InputSizeEnum = "sm" | "lg" | "md";

export type InputPropsType = {
  label?: string;
  error?: boolean;
  prefix?: string;
  suffix?: string;
  select?: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  placeholder?: string;
  size?: InputSizeEnum;
  style?: StyleProp<any>;
  onPress?: VoidFunction;
  containerStyle?: StyleProp<any>;
  icon?: ReactElement<IconPropsType>;
  onChange?: (value: string) => void;
  actionIconButton?: ReactElement<ButtonProps>;
} & Omit<TextInputProps, "onChange">;
