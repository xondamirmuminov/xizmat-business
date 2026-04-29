import { Circle, Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function UserPenIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-user-pen-icon lucide-user-pen"
    >
      <Path d="M11.5 15H7a4 4 0 00-4 4v2M21.378 16.626a1 1 0 00-3.004-3.004l-4.01 4.012a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506z" />
      <Circle r={4} cy={7} cx={10} />
    </SvgWrapper>
  );
}
