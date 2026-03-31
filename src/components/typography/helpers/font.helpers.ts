import { TypographyWeightEnum } from "../types";

export const getFontFamily = ({
  weight,
  italic,
}: {
  italic?: boolean;
  weight: TypographyWeightEnum;
}) => {
  const fontFamily: Record<TypographyWeightEnum, string> = {
    regular: "Inter",
    bold: "Inter Bold",
    medium: "Inter Medium",
    semibold: "Inter Semibold",
  };

  return italic ? fontFamily[weight] + " Italic" : fontFamily[weight];
};
