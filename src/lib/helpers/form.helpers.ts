import { TFunction } from "i18next";
import { FieldError } from "react-hook-form";

export const getErrorMessage = (t: TFunction<"translation", undefined>) => {
  return (
    error: undefined | FieldError,
    options?: { min?: number; max?: number; isArray?: boolean },
  ) => {
    if (error) {
      const fieldName = error?.ref?.name?.split(".")[0];

      return t(`form_errors.${error?.type}`, {
        min: options?.min,
        max: options?.max,
        name: t(`labels.${fieldName}`),
        nameLowercased: t(`labels.${fieldName}`)?.toLocaleLowerCase(),
      });
    }

    return undefined;
  };
};
