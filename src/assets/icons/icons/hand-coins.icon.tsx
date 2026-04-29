import { Path, Circle } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function HandCoinsIcon(props: IconPropsType) {
  return (
    <SvgWrapper
      {...props}
      className="lucide lucide-hand-coins-icon lucide-hand-coins"
    >
      <Path d="M11 15h2a2 2 0 100-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <Path d="M7 21l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 00-2.75-2.91l-4.2 3.9M2 16l6 6" />
      <Circle cy={9} cx={16} r={2.9} />
      <Circle r={3} cx={6} cy={5} />
    </SvgWrapper>
  );
}
