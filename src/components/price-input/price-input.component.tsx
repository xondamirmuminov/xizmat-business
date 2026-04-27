import { formatPriceInputValue } from "@/lib/helpers";

import { Input, InputPropsType } from "../input";

export function PriceInput({ value, onChange, ...props }: InputPropsType) {
  const handleChangeInput = (value: string) => {
    const rawValue = value.replace(/\D/g, "");

    if (onChange) {
      onChange(rawValue);
    }
  };

  const formattedValue = formatPriceInputValue(value as string);

  return (
    <Input
      suffix="so'm"
      value={formattedValue}
      keyboardType="number-pad"
      onChange={handleChangeInput}
      {...props}
    />
  );
}
