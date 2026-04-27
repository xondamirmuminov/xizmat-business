import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";

import { ServiceFormValuesType } from "@/types";
import { Flex, Upload, Typography } from "@/components";

export function ServiceImagesFormStep() {
  const { control } = useFormContext<ServiceFormValuesType>();

  const { t } = useTranslation();

  return (
    <Flex gap={3}>
      <Flex gap={1.5}>
        <Flex gap={0.5}>
          <Typography weight="medium">
            {t("create_service.steps.images.primary_image.title")}
          </Typography>
          <Typography size="text-xs" color="secondary">
            {t("create_service.steps.images.primary_image.description")}
          </Typography>
        </Flex>
        <Controller
          control={control}
          name="primaryImage"
          render={({ field }) => <Upload {...field} />}
        />
      </Flex>
      <Flex gap={1.5}>
        <Flex gap={0.5}>
          <Typography weight="medium">
            {t("create_service.steps.images.images.title")}
          </Typography>
          <Typography size="text-xs" color="secondary">
            {t("create_service.steps.images.images.description")}
          </Typography>
        </Flex>
        <Controller
          name="images"
          control={control}
          render={({ field }) => <Upload {...field} multiple />}
        />
      </Flex>
    </Flex>
  );
}
