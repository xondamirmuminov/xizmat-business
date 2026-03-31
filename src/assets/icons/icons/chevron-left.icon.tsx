import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ChevronLeftIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-chevron-left-icon lucide-chevron-left"
    >
      <Path d="M15 18l-6-6 6-6" />
    </SvgWrapper>
  );
}
