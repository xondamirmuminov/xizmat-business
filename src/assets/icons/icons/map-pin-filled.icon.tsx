import { G, Defs, Path, Ellipse } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function MapPinFilledIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled width={32} height={42} viewBox="0 0 32 42">
      <G filter="url(#filter0_f_14_114)">
        <Ellipse
          cx={16}
          fill="#000"
          cy={37.7143}
          rx={5.33333}
          ry={1.90476}
          fillOpacity={0.2}
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 0c8.837 0 16 7.163 16 16 0 6.775-4.211 12.567-10.159 14.9l-4.93 6.739c-.103.14-.239.256-.398.335a1.148 1.148 0 01-1.027 0 1.104 1.104 0 01-.397-.335l-4.93-6.739C4.211 28.567 0 22.775 0 16 0 7.163 7.163 0 16 0z"
      />
      <Path
        fill="#a00000"
        d="M22.857 16a6.857 6.857 0 10-13.714 0 6.857 6.857 0 0013.714 0z"
      />
      <Defs></Defs>
    </SvgWrapper>
  );
}
