import { StyleProp, ViewStyle, DimensionValue } from "react-native";

import { ButtonRadiusEnum } from "@/components/button";
import { TypographySizeEnum } from "@/components/typography";

export type SkeletonPropsType = {
  animated?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: ButtonRadiusEnum;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  typographySize?: TypographySizeEnum;
};
