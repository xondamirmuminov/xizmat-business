import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function LogOutIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-log-out-icon lucide-log-out"
    >
      <Path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    </SvgWrapper>
  );
}
