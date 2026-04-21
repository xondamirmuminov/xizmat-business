import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function HistoryIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-history-icon lucide-history"
    >
      <Path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
      <Path d="M3 3v5h5M12 7v5l4 2" />
    </SvgWrapper>
  );
}
