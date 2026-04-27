import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function SunIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-sun-icon lucide-sun">
      <Circle r="4" cx="12" cy="12" />
      <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </SvgWrapper>
  );
}
