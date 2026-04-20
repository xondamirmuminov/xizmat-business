import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function QueueFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 1a1 1 0 110 2H3a1 1 0 010-2h18zM22 16a3 3 0 01-3 3H5a3 3 0 01-3-3V8a3 3 0 013-3h14a3 3 0 013 3v8zm-1 5a1 1 0 110 2H3a1 1 0 110-2h18z"
      />
    </SvgWrapper>
  );
}
