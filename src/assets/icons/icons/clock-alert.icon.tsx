import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ClockAlertIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-clock-alert-icon lucide-clock-alert"
    >
      <Path d="M12 6v6l4 2M20 12v5M20 21h.01M21.25 8.2A10 10 0 1016 21.16" />
    </SvgWrapper>
  );
}
