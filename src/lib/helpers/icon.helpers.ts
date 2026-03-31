import { cloneElement, ReactElement } from "react";

import { IconPropsType } from "@/types";

export const renderIcon = ({
  icon,
  size,
  color,
  style,
}: {
  icon?: ReactElement<IconPropsType>;
} & IconPropsType) => {
  if (!icon) return null;

  return cloneElement(icon, {
    size,
    color,
    style,
  });
};
