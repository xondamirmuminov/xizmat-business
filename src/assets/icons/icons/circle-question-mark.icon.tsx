import { Circle, Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function CircleQuestionMarkIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
    </SvgWrapper>
  );
}
