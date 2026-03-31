import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function CheckIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-check-icon lucide-check">
      <Path d="M20 6L9 17l-5-5" />
    </SvgWrapper>
  );
}
