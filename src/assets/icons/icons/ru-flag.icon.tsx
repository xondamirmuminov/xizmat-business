import { G, Defs, Path, Rect, ClipPath } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function RuFlagIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled fill="none">
      <G clipPath="url(#clip0_406_40)">
        <Path fill="#F5F5F5" d="M24 0H0v24h24V0z" />
        <Path fill="#fff" d="M741.6-830.4h-2251.2V355.2H741.6V-830.4z" />
        <Path fill="#0052B4" d="M24 0H0v24h24V0z" />
        <Path fill="#F0F0F0" d="M24 0H0v8h24V0z" />
        <Path fill="#D80027" d="M24 16.001H0v8h24v-8z" />
      </G>
      <Defs>
        <ClipPath id="clip0_406_40">
          <Rect rx={12} width={24} height={24} fill="#fff" />
        </ClipPath>
      </Defs>
    </SvgWrapper>
  );
}
