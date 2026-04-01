import { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import { Switch, Platform } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

import { getErrorMessage } from "@/lib/helpers";
import { CirclePlusIcon, CircleMinusIcon } from "@/assets";
import {
  Flex,
  Input,
  Button,
  Divider,
  PhoneInput,
  Typography,
} from "@/components";

export function BusinessGeneralFormStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  const {
    append: appendPhoneNumber,
    remove: removePhoneNumber,
    fields: phoneNumbersFields,
  } = useFieldArray({
    control,
    name: "phoneNumbers",
    rules: { required: true },
  });

  const { fields: workingDaysFields } = useFieldArray({
    control,
    name: "workingDays",
  });

  const handleOpenTimePicker = (
    fieldName: string,
    value: Dayjs,
    onChange: (value: Dayjs) => void,
  ) => {
    DateTimePickerAndroid.open({
      mode: "time",
      is24Hour: true,
      value: value?.toDate(),
      onChange: (event, date) => {
        onChange(dayjs(date));
      },
    });
  };

  useEffect(() => {
    if (!phoneNumbersFields?.length) {
      appendPhoneNumber("");
    }
  }, [phoneNumbersFields]);

  const handleGetErrorMessage = getErrorMessage(errors, t);

  return (
    <Flex gap={3}>
      <Controller
        control={control}
        name="businessName"
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            required
            error={!!error}
            label={t("labels.businessName")}
            placeholder={t("placeholders.businessName")}
            helperText={handleGetErrorMessage(field?.name)}
          />
        )}
      />
      <Flex gap={2} alignItems="flex-start">
        {phoneNumbersFields?.map((phoneField, index) => (
          <Flex
            gap={1.5}
            direction="row"
            alignItems="center"
            key={phoneField?.id}
          >
            {index !== 0 && (
              <Button
                size="sm"
                color="error"
                variant="text"
                radius="circular"
                startIcon={<CircleMinusIcon />}
                onPress={() => removePhoneNumber(index)}
              />
            )}
            <Controller
              control={control}
              rules={{ required: true }}
              name={`phoneNumbers.${index}`}
              render={({ field, fieldState: { error } }) => (
                <PhoneInput
                  {...field}
                  required
                  error={!!error}
                  helperText={handleGetErrorMessage(field?.name)}
                  label={index === 0 ? t("labels.phoneNumbers") : undefined}
                />
              )}
            />
          </Flex>
        ))}
        <Button
          size="sm"
          variant="ghost"
          color="secondary"
          startIcon={<CirclePlusIcon />}
          onPress={() => appendPhoneNumber("")}
        >
          {t("create_business.steps.general.add_phone")}
        </Button>
      </Flex>
      <Divider space={0} />
      <Flex gap={1}>
        <Typography size="text-sm" weight="medium">
          {t("labels.working_days")}
        </Typography>
        <Flex style={styles.workingDaysWrapper}>
          {workingDaysFields?.map((weekDay, index) => (
            <Flex key={weekDay?.id}>
              <Controller
                control={control}
                name={`workingDays.${index}`}
                render={({ field }) => (
                  <Flex
                    gap={2}
                    direction="row"
                    alignItems="center"
                    style={styles.workingDayItem}
                    justifyContent="space-between"
                  >
                    <Flex gap={0.5}>
                      <Typography weight="medium">
                        {t(`date.week_days.${field?.value?.value}`)}
                      </Typography>
                      <Typography
                        size="text-xs"
                        color={field?.value?.isClosed ? "error" : "success"}
                      >
                        {field?.value?.isClosed
                          ? t("labels.closed")
                          : t("labels.working_day")}
                      </Typography>
                    </Flex>
                    <Flex>
                      <Switch
                        value={!field?.value?.isClosed}
                        onValueChange={(value) => {
                          field?.onChange({
                            ...field?.value,
                            isClosed: !value,
                          });
                        }}
                      />
                    </Flex>
                  </Flex>
                )}
              />
              {index !== workingDaysFields?.length - 1 && <Divider space={0} />}
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex gap={1.5}>
        <Typography size="text-sm" weight="medium">
          {t("labels.working_hours")}
        </Typography>
        {Platform.OS === "ios" ? (
          <Flex gap={3} direction="row" alignItems="center">
            <Flex direction="row" alignItems="center">
              <Typography weight="medium">{t("labels.from")}</Typography>
              <Controller
                control={control}
                name="workingHours.from"
                render={({ field }) => (
                  <DateTimePicker
                    is24Hour
                    mode="time"
                    value={field?.value?.toDate()}
                    onChange={(_, date) => field?.onChange(dayjs(date))}
                  />
                )}
              />
            </Flex>
            <Flex direction="row" alignItems="center">
              <Typography weight="medium">{t("labels.to")}</Typography>
              <Controller
                control={control}
                name="workingHours.to"
                render={({ field }) => (
                  <DateTimePicker
                    is24Hour
                    mode="time"
                    value={field?.value?.toDate()}
                    onChange={(_, date) => field?.onChange(dayjs(date))}
                  />
                )}
              />
            </Flex>
          </Flex>
        ) : (
          <Flex gap={3} direction="row" alignItems="center">
            <Flex gap={1} flex={1} direction="row" alignItems="center">
              <Typography weight="medium">{t("labels.from")}</Typography>
              <Controller
                control={control}
                name="workingHours.from"
                render={({ field }) => (
                  <Input
                    {...field}
                    editable={false}
                    placeholder="from"
                    value={dayjs(field?.value).format("HH:mm")}
                    onPress={() =>
                      handleOpenTimePicker(
                        field?.name,
                        field?.value,
                        field?.onChange,
                      )
                    }
                  />
                )}
              />
            </Flex>
            <Flex gap={1} flex={1} direction="row" alignItems="center">
              <Typography weight="medium">{t("labels.to")}</Typography>
              <Controller
                control={control}
                name="workingHours.to"
                render={({ field }) => (
                  <Input
                    {...field}
                    editable={false}
                    placeholder="to"
                    value={dayjs(field?.value).format("HH:mm")}
                    onPress={() =>
                      handleOpenTimePicker(
                        field?.name,
                        field?.value,
                        field?.onChange,
                      )
                    }
                  />
                )}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  workingDayItem: { paddingInline: space(2), paddingBlock: space(1.5) },
  workingDaysWrapper: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.slate4,
    backgroundColor: colors.slate2,
  },
}));
