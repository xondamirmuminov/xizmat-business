import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ChevronDownIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-chevron-down-icon lucide-chevron-down"
    >
      <Path d="M6 9l6 6 6-6" />
    </SvgWrapper>
  );
}
