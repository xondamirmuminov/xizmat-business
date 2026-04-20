import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function CircleCheckFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm-7.293-2.707a1 1 0 00-1.414 0L11 12.586l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" />
    </SvgWrapper>
  );
}
