import { InputSizeEnum, InputPropsType } from "@/components/input";

export type SelectOptionType<T = string> = { value: T; label: string };

export type SelectPropsType = {
  value?: string;
  sheetTitle: string;
  size?: InputSizeEnum;
  inputProps?: InputPropsType;
  options: SelectOptionType[];
  onChange?: (value: string) => void;
};
