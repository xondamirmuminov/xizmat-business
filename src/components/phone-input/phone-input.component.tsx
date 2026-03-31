import { PHONE_NUMBER_COUNTRY_CODE } from "@/lib/constants";
import { cleanPhone, formatPhoneNumber } from "@/lib/helpers";

import { Input, InputPropsType } from "../input";

export function PhoneInput({ value, onChange, ...props }: InputPropsType) {
  const handleChangeInput = (value: string) => {
    const rawValue = cleanPhone(value);

    if (onChange) {
      onChange(rawValue);
    }
  };

  const formattedValue = formatPhoneNumber(value as string);
  return (
    <Input
      maxLength={14}
      autoComplete="tel"
      value={formattedValue}
      keyboardType="phone-pad"
      onChange={handleChangeInput}
      textContentType="telephoneNumber"
      prefix={PHONE_NUMBER_COUNTRY_CODE}
      {...props}
    />
  );
}
