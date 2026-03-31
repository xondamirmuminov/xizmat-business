import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ChevronRightIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-chevron-right-icon lucide-chevron-right"
    >
      <Path d="M9 18l6-6-6-6" />
    </SvgWrapper>
  );
}
