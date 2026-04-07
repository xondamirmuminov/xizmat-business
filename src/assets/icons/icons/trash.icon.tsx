import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function TrashIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-trash2-icon lucide-trash-2">
      <Path d="M10 11v6" />
      <Path d="M14 11v6" />
      <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <Path d="M3 6h18" />
      <Path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </SvgWrapper>
  );
}
