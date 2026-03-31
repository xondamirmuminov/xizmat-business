import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function XIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-x-icon lucide-x">
      <Path d="M18 6L6 18M6 6l12 12" />
    </SvgWrapper>
  );
}
