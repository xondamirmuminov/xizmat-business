import { Path, Rect } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function CalendarIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-calendar-icon lucide-calendar"
    >
      <Path d="M8 2v4M16 2v4" />
      <Rect x={3} y={4} rx={2} width={18} height={18} />
      <Path d="M3 10h18" />
    </SvgWrapper>
  );
}
