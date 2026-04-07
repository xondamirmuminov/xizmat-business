import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function CirclePlusIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-circle-plus-icon lucide-circle-plus"
    >
      <Circle r={10} cx={12} cy={12} />
      <Path d="M8 12h8M12 8v8" />
    </SvgWrapper>
  );
}
