import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function ShareIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-share-icon lucide-share">
      <Path d="M12 2v13M16 6l-4-4-4 4M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
    </SvgWrapper>
  );
}
