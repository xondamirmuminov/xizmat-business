import { Path, Rect } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function MailIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-mail-icon lucide-mail">
      <Rect width={20} height={16} x={2} y={4} rx={2} />
      <Path d="m22 7-8.97 5.74a1.94 1.94 0 0 1-2.06 0L2 7" />
    </SvgWrapper>
  );
}
