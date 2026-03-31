import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function EyeIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-eye-icon lucide-eye">
      <Path d="M2.062 12.348a1 1 0 010-.696 10.75 10.75 0 0119.876 0 1 1 0 010 .696 10.75 10.75 0 01-19.876 0" />
      <Circle r={3} cx={12} cy={12} />
    </SvgWrapper>
  );
}
