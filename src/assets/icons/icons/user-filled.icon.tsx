import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function UserFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 7A5 5 0 117 7a5 5 0 0110 0zM19 22H5a1 1 0 01-1-1v-2a5 5 0 015-5h6a5 5 0 015 5v2a1 1 0 01-1 1z"
      />
    </SvgWrapper>
  );
}
