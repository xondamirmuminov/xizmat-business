import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";

import { Flex, Input } from "@/components";
import { getErrorMessage } from "@/lib/helpers";
import { BusinessFormValuesType } from "@/types";

import { SOCIAL_LINKS_FIELDS } from "./constants";

export function BusinessSocialLinksFormStep() {
  const { control } = useFormContext<BusinessFormValuesType>();

  const { t } = useTranslation();

  const handleGetErrorMessage = getErrorMessage(t);

  return (
    <Flex gap={3}>
      {SOCIAL_LINKS_FIELDS?.map((socialLinkField) => (
        <Controller
          control={control}
          key={socialLinkField?.name}
          name={`socialMediaLinks.${socialLinkField?.name}`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              error={!!error}
              autoCorrect={false}
              autoCapitalize="none"
              icon={socialLinkField?.icon}
              label={t(socialLinkField?.label)}
              helperText={handleGetErrorMessage(error)}
              placeholder={t(socialLinkField?.placeholder)}
            />
          )}
        />
      ))}
    </Flex>
  );
}
