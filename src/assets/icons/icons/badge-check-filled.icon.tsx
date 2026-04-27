import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function BadgeCheckFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path d="M22.995 12a5 5 0 01-1.769 3.813 4.999 4.999 0 01-1.44 3.964 5 5 0 01-3.96 1.448 4.999 4.999 0 01-6.228 1.16 4.998 4.998 0 01-1.414-1.159 5 5 0 01-5.411-5.4A5 5 0 011.61 9.59a5 5 0 011.164-1.417A5 5 0 016.364 2.95a5 5 0 011.822-.178 5 5 0 016.215-1.153 5 5 0 011.412 1.153A5 5 0 0121.05 6.36a5 5 0 01.176 1.826A5 5 0 0122.995 12zm-7.288-2.707a1 1 0 00-1.414 0L11 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" />
    </SvgWrapper>
  );
}
