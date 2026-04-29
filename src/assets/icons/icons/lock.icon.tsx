import { Circle, Path, Rect } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function LockIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"
    >
      <Circle r={1} cx={12} cy={16} />
      <Rect x={3} y={10} rx={2} width={18} height={12} />
      <Path d="M7 10V7a5 5 0 0110 0v3" />
    </SvgWrapper>
  );
}
