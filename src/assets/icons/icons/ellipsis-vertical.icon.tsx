import { Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function EllipsisVerticalIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-ellipsis-vertical">
      <Circle cx={12} cy={12} r={1} />
      <Circle cx={12} cy={5} r={1} />
      <Circle cx={12} cy={19} r={1} />
    </SvgWrapper>
  );
}
