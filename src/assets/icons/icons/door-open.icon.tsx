import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function DoorOpenIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-door-open-icon lucide-door-open"
    >
      <Path d="M11 20H2M11 4.562v16.157a1 1 0 001.242.97L19 20V5.562a2 2 0 00-1.515-1.94l-4-1A2 2 0 0011 4.561zM11 4H8a2 2 0 00-2 2v14M14 12h.01M22 20h-3" />
    </SvgWrapper>
  );
}
