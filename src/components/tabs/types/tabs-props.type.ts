import { ReactElement } from "react";
import { StyleProp } from "react-native";

import { IconPropsType } from "@/types";

export type TabItemType = {
  key: string;
  label: string;
  icon?: ReactElement<IconPropsType>;
};

export type TabsPropsType = {
  activeTab: string;
  items: TabItemType[];
  containerStyle?: StyleProp<any>;
  getLabel?: (label: string) => string;
  onTabPress?: (activeKey: string, index: number) => void;
};
