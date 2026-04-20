import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function CircleXFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm-7.293-3.707a1 1 0 00-1.414 0L12 10.586 9.707 8.293a1 1 0 10-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 101.414 1.414L12 13.414l2.293 2.293a1 1 0 101.414-1.414L13.414 12l2.293-2.293a1 1 0 000-1.414z" />
    </SvgWrapper>
  );
}
