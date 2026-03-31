import { ReactNode } from "react";
import { StyleProp, FlexAlignType } from "react-native";

export type FlexPropsType = {
  gap?: number;
  flex?: number;
  flexShrink?: number;
  children?: ReactNode;
  style?: StyleProp<any>;
  alignItems?: FlexAlignType;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-evenly"
    | "space-between";
};
