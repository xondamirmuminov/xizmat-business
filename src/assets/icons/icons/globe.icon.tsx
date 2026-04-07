import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function GlobeIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-globe-icon lucide-globe">
      <Circle r={10} cx={12} cy={12} />
      <Path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20M2 12h20" />
    </SvgWrapper>
  );
}
