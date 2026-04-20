import { Path, Rect } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function QueueIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-gallery-vertical-icon lucide-gallery-vertical"
    >
      <Path d="M3 2h18" />
      <Rect x={3} y={6} rx={2} width={18} height={12} />
      <Path d="M3 22h18" />
    </SvgWrapper>
  );
}
