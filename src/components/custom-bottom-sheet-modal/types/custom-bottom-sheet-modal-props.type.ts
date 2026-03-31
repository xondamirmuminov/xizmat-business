import { StyleProp } from "react-native";
import { ReactNode, RefObject } from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";

export type CustomBottomSheetModalPropsType = {
  title?: string;
  children?: ReactNode;
  contentStyle?: StyleProp<any>;
  ref: RefObject<null | BottomSheetModal>;
} & BottomSheetModalProps<any>;
