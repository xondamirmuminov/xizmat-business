import { TFunction } from "i18next";
import { FieldErrors, FieldValues } from "react-hook-form";

export const getErrorMessage = (
  errors: FieldErrors<FieldValues>,
  t: TFunction<"translation", undefined>,
) => {
  return (fieldName: string, options?: { min?: number; max?: number }) => {
    const fieldError = errors[fieldName];

    if (fieldError) {
      return t(`form_errors.${fieldError?.type}`, {
        min: options?.min,
        max: options?.max,
        name: t(`labels.${fieldName}`),
        nameLowercased: t(`labels.${fieldName}`)?.toLocaleLowerCase(),
      });
    }

    return undefined;
  };
};
