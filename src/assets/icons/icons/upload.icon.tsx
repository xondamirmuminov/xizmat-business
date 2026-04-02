import { Path } from "react-native-svg";

import { IconPropsType } from "@/types";

import { SvgWrapper } from "../components";

export function UploadIcon(props: IconPropsType) {
  return (
    <SvgWrapper {...props} className="lucide lucide-upload-icon lucide-upload">
      <Path d="M12 3v12M17 8l-5-5-5 5M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    </SvgWrapper>
  );
}
