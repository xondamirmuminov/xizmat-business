import { PHONE_NUMBER_COUNTRY_CODE } from "../constants";

export const cleanPhone = (phone: string) => ("" + phone)?.replace(/\D/g, "");

export const formatPhoneNumber = (phone: string) => {
  if (phone?.startsWith(PHONE_NUMBER_COUNTRY_CODE)) {
    phone = phone?.slice(PHONE_NUMBER_COUNTRY_CODE.length);
  }
  const cleanedPhone = cleanPhone(phone);

  return cleanedPhone?.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
};

export const formatPhoneNumberForSubmit = (phone: string) => {
  if (!phone?.startsWith(PHONE_NUMBER_COUNTRY_CODE)) {
    return PHONE_NUMBER_COUNTRY_CODE + cleanPhone(phone);
  }
  return phone;
};

export const formatPhoneNumberForDisplay = (phone: string) => {
  return phone?.replace(
    /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
    "$1 $2 $3 $4 $5",
  );
};
