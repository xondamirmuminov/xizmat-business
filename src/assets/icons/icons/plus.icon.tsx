import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function PlusIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-plus-icon lucide-plus">
      <Path d="M5 12h14M12 5v14" />
    </SvgWrapper>
  );
}
