import { Circle, Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function UserIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-user-icon lucide-user">
      <Path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
      <Circle r={4} cy={7} cx={12} />
    </SvgWrapper>
  );
}
