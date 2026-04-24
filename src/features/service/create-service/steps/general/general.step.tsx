import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useWatch, Controller, useFormContext } from "react-hook-form";

import { getErrorMessage } from "@/lib/helpers";
import { ServiceFormValuesType } from "@/types";
import { UzFlagIcon, RuFlagIcon, UsFlagIcon } from "@/assets";
import {
  Flex,
  Input,
  Button,
  Divider,
  Typography,
  PriceInput,
} from "@/components";

export function ServiceGeneralFormStep() {
  const { control, setValue, getValues, clearErrors } =
    useFormContext<ServiceFormValuesType>();

  const hoursFormValue = useWatch({ control, name: "hours" });
  const minutesFormValue = useWatch({ control, name: "minutes" });

  const { t } = useTranslation();

  const handleResetTitleToDefault = () => {
    const category = getValues("category");

    if (!isEmpty(category?.title)) {
      setValue("title", category?.title);
    }
  };

  useEffect(() => {
    const totalMinutes = Number(hoursFormValue) * 60 + Number(minutesFormValue);

    setValue("durationMinutes", totalMinutes);

    if (totalMinutes > 0) {
      clearErrors("durationMinutes");
    }
  }, [hoursFormValue, minutesFormValue]);

  const handleGetErrorMessage = getErrorMessage(t);

  return (
    <Flex gap={3}>
      <Flex gap={1.5} alignItems="flex-start">
        <Flex gap={0.5}>
          <Typography size="text-sm" weight="medium">
            {t("labels.title")}{" "}
            <Typography color="error" size="text-sm" weight="medium">
              *
            </Typography>
          </Typography>
          <Typography size="text-xs" color="secondary">
            {t("create_service.general.title_helper_text")}
          </Typography>
        </Flex>
        <Flex gap={2} alignItems="flex-start">
          <Controller
            name="title.uz"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                error={!!error}
                icon={<UzFlagIcon />}
                helperText={handleGetErrorMessage(error)}
              />
            )}
          />
          <Controller
            name="title.ru"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                error={!!error}
                icon={<RuFlagIcon />}
                helperText={handleGetErrorMessage(error)}
              />
            )}
          />
          <Controller
            name="title.en"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                error={!!error}
                icon={<UsFlagIcon />}
                helperText={handleGetErrorMessage(error)}
              />
            )}
          />
          <Button
            size="sm"
            variant="text"
            color="primary"
            onPress={handleResetTitleToDefault}
          >
            {t("create_service.general.reset")}
          </Button>
        </Flex>
      </Flex>
      <Divider space={0} />
      <Flex gap={1}>
        <Typography size="text-sm" weight="medium">
          {t("labels.duration")}{" "}
          <Typography color="error" size="text-sm" weight="medium">
            *
          </Typography>
        </Typography>
        <Flex gap={1} direction="row" alignItems="center">
          <Controller
            name="hours"
            control={control}
            rules={{ min: 0, required: true }}
            render={({ field, fieldState: { error } }) => {
              return (
                <Input
                  {...field}
                  maxLength={2}
                  error={!!error}
                  placeholder="00"
                  keyboardType="number-pad"
                  value={field?.value?.toString()}
                  suffix={t("create_service.general.hours")}
                  helperText={handleGetErrorMessage(error, { min: 0 })}
                  onChange={(value) => {
                    const number = parseInt(
                      value?.toString()?.replace(/^D/g, "") || "0",
                    );

                    field?.onChange(number);

                    if (number > 0) {
                      clearErrors("minutes");
                    }
                  }}
                />
              );
            }}
          />
          <Typography size="text-lg" color="secondary">
            :
          </Typography>
          <Controller
            name="minutes"
            control={control}
            rules={{
              min: 0,
              max: 59,
              required: true,
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <Input
                  {...field}
                  maxLength={2}
                  error={!!error}
                  placeholder="00"
                  keyboardType="number-pad"
                  value={field?.value?.toString()}
                  suffix={t("create_service.general.min")}
                  helperText={handleGetErrorMessage(error, {
                    min: 0,
                    max: 59,
                  })}
                  onChange={(value) => {
                    const number = parseInt(
                      value?.toString()?.replace(/^D/g, "") || "0",
                      10,
                    );

                    field?.onChange(Math.min(number, 59));
                  }}
                />
              );
            }}
          />
        </Flex>
        <Controller
          control={control}
          name="durationMinutes"
          rules={{ min: 1, required: true }}
          render={({ fieldState: { error } }) =>
            error ? (
              <Typography color="error" size="text-sm">
                {handleGetErrorMessage(error, { min: 1 })}
              </Typography>
            ) : (
              <></>
            )
          }
        />
      </Flex>
      <Controller
        name="price"
        control={control}
        rules={{ min: 0, required: true }}
        render={({ field, fieldState: { error } }) => {
          return (
            <PriceInput
              {...field}
              required
              error={!!error}
              label={t("labels.price")}
              value={field?.value?.toString()}
              helperText={handleGetErrorMessage(error, { min: 0 })}
              onChange={(value) => field?.onChange(parseInt(value || "0"))}
            />
          );
        }}
      />
    </Flex>
  );
}
