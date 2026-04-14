import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ClockFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zM12 5a1 1 0 00-1 1v6a1 1 0 00.553.895l4 2a1 1 0 00.894-1.79L13 11.382V6a1 1 0 00-1-1z"
      />
    </SvgWrapper>
  );
}
