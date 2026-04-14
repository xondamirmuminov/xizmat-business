import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ClipboardClockFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path d="M18 3a3 3 0 013 3v.832a1 1 0 11-2 0V6a1 1 0 00-1-1h-1a2 2 0 01-2 2H9a2 2 0 01-2-2H6a1 1 0 00-1 1v14a1 1 0 001 1h2a1 1 0 110 2H6a3 3 0 01-3-3V6a3 3 0 013-3h1a2 2 0 012-2h6a2 2 0 012 2h1z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 23a7 7 0 100-14 7 7 0 000 14zm-1-9a1 1 0 112 0v1.645l1.13.707a1.001 1.001 0 01-1.06 1.696l-1.6-1A1 1 0 0115 16.2V14z"
      />
    </SvgWrapper>
  );
}
