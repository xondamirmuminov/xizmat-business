import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { FlexPropsType } from "./types";

export function Flex({
  flex,
  style,
  gap = 0,
  children,
  flexShrink,
  flexWrap = "nowrap",
  direction = "column",
  alignItems = "stretch",
  justifyContent = "flex-start",
}: FlexPropsType) {
  const { theme } = useUnistyles();

  return (
    <View
      style={[
        {
          flex,
          flexWrap,
          flexShrink,
          alignItems,
          justifyContent,
          gap: theme.space(gap),
          flexDirection: direction,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
