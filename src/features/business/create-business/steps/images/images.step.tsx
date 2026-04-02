import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";

import { Flex, Upload, Typography } from "@/components";

export function BusinessImagesFormStep() {
  const { control } = useFormContext();

  const { t } = useTranslation();

  return (
    <Flex gap={3}>
      <Flex gap={1.5}>
        <Flex gap={0.5}>
          <Typography weight="medium">
            {t("create_business.steps.images_media.logo.title")}
          </Typography>
          <Typography size="text-xs" color="secondary">
            {t("create_business.steps.images_media.logo.description")}
          </Typography>
        </Flex>
        <Controller
          name="logo"
          control={control}
          render={({ field }) => <Upload {...field} />}
        />
      </Flex>
      <Flex gap={1.5}>
        <Flex gap={0.5}>
          <Typography weight="medium">
            {t("create_business.steps.images_media.thumbnail.title")}
          </Typography>
          <Typography size="text-xs" color="secondary">
            {t("create_business.steps.images_media.thumbnail.description")}
          </Typography>
        </Flex>
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => <Upload {...field} />}
        />
      </Flex>
      <Flex gap={1.5}>
        <Flex gap={0.5}>
          <Typography weight="medium">
            {t("create_business.steps.images_media.images.title")}
          </Typography>
          <Typography size="text-xs" color="secondary">
            {t("create_business.steps.images_media.images.description")}
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
