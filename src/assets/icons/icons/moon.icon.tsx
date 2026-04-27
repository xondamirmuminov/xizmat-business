import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function MoonIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-moon-icon lucide-moon">
      <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </SvgWrapper>
  );
}
