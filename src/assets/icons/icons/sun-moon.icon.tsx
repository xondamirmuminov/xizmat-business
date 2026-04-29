import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function SunMoonIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-sun-moon-icon lucide-sun-moon"
    >
      <Path d="M12 2v2M14.837 16.385a6 6 0 11-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 005.26 5.259c.589-.255 1.396.09 1.248.715M16 12a4 4 0 00-4-4M19 5l-1.256 1.256M20 12h2" />
    </SvgWrapper>
  );
}
