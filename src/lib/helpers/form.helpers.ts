import { TFunction } from "i18next";
import { FieldErrors, FieldValues } from "react-hook-form";

export const getErrorMessage = (
  errors: FieldErrors<FieldValues>,
  t: TFunction<"translation", undefined>,
) => {
  return (
    fieldName: string,
    options?: { min?: number; max?: number; isArray?: boolean },
  ) => {
    const fieldNameArray = fieldName?.split(".");
    const fieldArrayError = (errors[fieldNameArray[0]] as unknown as any[])
      ? (errors[fieldNameArray[0]] as unknown as any[])[
          (fieldNameArray[1] as unknown as number) || 0
        ]
      : null;
    const fieldError = options?.isArray ? fieldArrayError : errors[fieldName];
    const formattedFieldName = options?.isArray ? fieldNameArray[0] : fieldName;

    if (fieldError) {
      return t(`form_errors.${fieldError?.type}`, {
        min: options?.min,
        max: options?.max,
        name: t(`labels.${formattedFieldName}`),
        nameLowercased: t(`labels.${formattedFieldName}`)?.toLocaleLowerCase(),
      });
    }

    return undefined;
  };
};
