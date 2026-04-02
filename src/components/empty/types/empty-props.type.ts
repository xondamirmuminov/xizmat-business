import { StyleProp } from "react-native";
import { ReactNode, ReactElement } from "react";

import { IconPropsType } from "@/types";

export type EmptyPropsType = {
  title?: string;
  description?: string;
  children?: ReactNode;
  style?: StyleProp<any>;
  iconStyle?: StyleProp<any>;
  icon?: ReactElement<IconPropsType>;
};
