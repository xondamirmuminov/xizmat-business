import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function CircleMinusIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-circle-minus-icon lucide-circle-minus"
    >
      <Circle r={10} cx={12} cy={12} />
      <Path d="M8 12h8" />
    </SvgWrapper>
  );
}
