import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function StoreIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-store-icon lucide-store">
      <Path d="M15 21v-5a1 1 0 00-1-1h-4a1 1 0 00-1 1v5M17.774 10.31a1.12 1.12 0 00-1.549 0 2.5 2.5 0 01-3.451 0 1.12 1.12 0 00-1.548 0 2.5 2.5 0 01-3.452 0 1.12 1.12 0 00-1.549 0 2.5 2.5 0 01-3.77-3.248l2.889-4.184A2 2 0 017 2h10a2 2 0 011.653.873l2.895 4.192a2.5 2.5 0 01-3.774 3.244" />
      <Path d="M4 10.95V19a2 2 0 002 2h12a2 2 0 002-2v-8.05" />
    </SvgWrapper>
  );
}
