import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function RefreshIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-refresh-cw-icon lucide-refresh-cw"
    >
      <Path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" />
      <Path d="M21 3v5h-5M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" />
      <Path d="M8 16H3v5" />
    </SvgWrapper>
  );
}
