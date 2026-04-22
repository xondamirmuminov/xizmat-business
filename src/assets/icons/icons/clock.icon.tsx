import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ClockIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-clock-icon lucide-clock">
      <Circle r={10} cx={12} cy={12} />
      <Path d="M12 6v6l4 2" />
    </SvgWrapper>
  );
}
