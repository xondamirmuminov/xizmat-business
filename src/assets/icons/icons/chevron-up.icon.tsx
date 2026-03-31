import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ChevronUpIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-chevron-up-icon lucide-chevron-up"
    >
      <Path d="M18 15l-6-6-6 6" />
    </SvgWrapper>
  );
}
