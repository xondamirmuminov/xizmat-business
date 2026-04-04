import { G, Path, Defs, ClipPath } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function FacebookIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} filled>
      <G clipPath="url(#clip0_17_61)">
        <Path d="M12 0C5.373 0 0 5.373 0 12c0 5.628 3.875 10.35 9.101 11.647v-7.98H6.627V12H9.1v-1.58c0-4.084 1.849-5.978 5.859-5.978.76 0 2.072.15 2.608.298v3.324c-.283-.03-.775-.044-1.386-.044-1.967 0-2.728.745-2.728 2.683V12h3.92l-.673 3.667h-3.247v8.245C19.396 23.195 24 18.135 24 12c0-6.627-5.373-12-12-12z" />
      </G>
      <Defs>
        <ClipPath id="clip0_17_61">
          <Path d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </SvgWrapper>
  );
}
