import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function StoreFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 19a3 3 0 01-3 3H6a3 3 0 01-3-3v-7.339a3.493 3.493 0 01-.784-.508 3.502 3.502 0 01-.582-4.659L4.522 2.31A3 3 0 017.001 1h10a3 3 0 012.48 1.31l2.885 4.18a3.501 3.501 0 01-.58 4.668 3.49 3.49 0 01-.786.508V19zm-7-5h-4a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1zM7.001 3a1.001 1.001 0 00-.828.44L3.279 7.63a1.5 1.5 0 002.256 1.957 2.12 2.12 0 012.932 0 1.498 1.498 0 002.07 0l.152-.133a2.12 2.12 0 012.776.132 1.5 1.5 0 002.071 0 2.119 2.119 0 012.844-.073 1 1 0 01.087.074 1.5 1.5 0 001.276.397 1.498 1.498 0 001.25-1.295 1.502 1.502 0 00-.261-1.048l-2.9-4.2a1.001 1.001 0 00-.708-.434L17 3h-10z"
      />
    </SvgWrapper>
  );
}
