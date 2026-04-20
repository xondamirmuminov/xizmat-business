import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ZapFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <Path d="M14.091 1.12a1.5 1.5 0 00-1.688.354l-9.9 10.2a2.002 2.002 0 00.43 3.02c.32.2.69.307 1.067.306h7.003l-.016.046-1.92 6.02-.01.039a1.5 1.5 0 002.54 1.422l9.9-10.2.06-.067A2.001 2.001 0 0020 9h-7.003l.016-.047 1.92-6.02.007-.025.004-.013a1.5 1.5 0 00-.023-.87l-.044-.12-.056-.114a1.5 1.5 0 00-.506-.551l-.11-.065-.114-.056z" />
    </SvgWrapper>
  );
}
