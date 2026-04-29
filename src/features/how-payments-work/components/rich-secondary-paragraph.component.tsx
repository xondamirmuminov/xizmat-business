import { Trans } from "react-i18next";
import { type StyleProp, type TextStyle } from "react-native";

import { Typography } from "@/components";

type RichSecondaryParagraphProps = {
  i18nKey: string;
  style?: StyleProp<TextStyle>;
};

export function RichSecondaryParagraph({
  style,
  i18nKey,
}: RichSecondaryParagraphProps) {
  return (
    <Typography style={style} size="text-sm" color="secondary">
      <Trans
        i18nKey={i18nKey}
        components={{
          em: (
            <Typography size="text-sm" weight="semibold" color="textPrimary" />
          ),
        }}
      />
    </Typography>
  );
}
