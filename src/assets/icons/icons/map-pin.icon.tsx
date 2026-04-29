import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function MapPinIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-map-pin-icon lucide-map-pin"
    >
      <Path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 01-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0116 0" />
      <Circle r={3} cx={12} cy={10} />
    </SvgWrapper>
  );
}
