export type CheckboxSizeEnum = "sm" | "lg" | "md";

export type CheckboxPropsType = {
  label?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  isChecked?: boolean;
  helperText?: string;
  value?: string | number;
  size?: CheckboxSizeEnum;
  onChange?: (value?: string | number) => void;
};
