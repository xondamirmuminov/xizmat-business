import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { FolderOpenIcon } from "@/assets";
import { renderIcon } from "@/lib/helpers";

import { Flex } from "../flex";
import { EmptyPropsType } from "./types";
import { Typography } from "../typography";

export function Empty({
  title,
  style,
  children,
  iconStyle,
  description,
  icon = <FolderOpenIcon />,
}: EmptyPropsType) {
  const { t } = useTranslation();
  return (
    <Flex gap={2} alignItems="center" style={[styles.wrapper, style]}>
      {renderIcon({ icon, style: [styles.icon, iconStyle] })}
      <Flex gap={0.5} alignItems="center">
        <Typography align="center" size="text-lg" weight="semibold">
          {title || t("empty.title")}
        </Typography>
        <Typography size="text-sm" align="center" color="secondary">
          {description || t("empty.description")}
        </Typography>
      </Flex>
      {children && (
        <Flex gap={1} direction="row" justifyContent="center">
          {children}
        </Flex>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  wrapper: {
    paddingBlock: space(2),
  },
  icon: {
    width: 40,
    height: 40,
    color: colors.primary,
  },
}));
