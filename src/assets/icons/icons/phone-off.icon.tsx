import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function PhoneOffIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-phone-off-icon lucide-phone-off"
    >
      <Path d="M10.1 13.9a14 14 0 003.732 2.668 1 1 0 001.213-.303l.355-.465A2 2 0 0117 15h3a2 2 0 012 2v3a2 2 0 01-2 2 18 18 0 01-12.728-5.272M22 2L2 22M4.76 13.582A18 18 0 012 4a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-.8 1.6l-.468.351a1 1 0 00-.292 1.233 14 14 0 00.244.473" />
    </SvgWrapper>
  );
}
