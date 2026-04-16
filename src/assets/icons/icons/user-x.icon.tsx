import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function UserXIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-user-x-icon lucide-user-x">
      <Path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <Circle r={4} cx={9} cy={7} />
      <Path d="M17 8L22 13" />
      <Path d="M22 8L17 13" />
    </SvgWrapper>
  );
}
