import { Path, Rect } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function CopyIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-copy">
      <Rect x="8" y="8" rx="2" ry="2" width="14" height="14" />
      <Path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </SvgWrapper>
  );
}
