import { Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function EllipsisVerticalIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-ellipsis-vertical">
      <Circle r={1} cx={12} cy={12} />
      <Circle r={1} cy={5} cx={12} />
      <Circle r={1} cx={12} cy={19} />
    </SvgWrapper>
  );
}
