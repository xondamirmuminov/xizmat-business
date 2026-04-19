import { View } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "sonner-native";
import { useState, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react";

import { PlusIcon } from "@/assets";
import { useAuthStore } from "@/store";
import { ServiceType, TimeSlotType, LocalizedTextType } from "@/types";
import { getErrorMessage, formatPhoneNumberForSubmit } from "@/lib/helpers";
import {
  Flex,
  Input,
  Select,
  Button,
  PhoneInput,
  SelectOptionType,
  CustomBottomSheetModal,
} from "@/components";

import { ServiceDateTimePicker } from "../date-time-picker";
import {
  SERVICES_QUERY,
  GET_AVAILABLE_TIME_SLOTS_QUERY,
  CREATE_BOOKING_BY_PROVIDER_MUTATION,
} from "../../api";

type Props = {
  ref: RefObject<null | BottomSheetModal>;
};

export function AddBookingModal({ ref }: Props) {
  const { reset, control, handleSubmit } = useForm();
  const { businessId } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<null | Dayjs>(null);

  const { t, i18n } = useTranslation();
  const locale = i18n?.language as keyof LocalizedTextType;

  const [getServices, { data, loading }] = useLazyQuery<{
    services: { items: ServiceType[] };
  }>(SERVICES_QUERY);

  const {
    data: timeSlotsData,
    loading: timeSlotsLoading,
    refetch: refetchTimeSlots,
  } = useQuery<{
    getAvailableTimeSlots: TimeSlotType[];
  }>(GET_AVAILABLE_TIME_SLOTS_QUERY, {
    skip: !businessId,
    variables: {
      businessId: businessId,
      date: selectedDate?.format("YYYY-MM-DD"),
    },
  });

  const [createBooking, { loading: createBookingLoading }] = useMutation(
    CREATE_BOOKING_BY_PROVIDER_MUTATION,
  );

  const handleModalChange = (index: number) => {
    if (index >= 0 && !data) {
      getServices({ variables: { businessId } });
    }
  };

  const handleCreateBookingCompleted = () => {
    refetchTimeSlots();
    toast.success(t("bookings.add_modal.success_message"));
    ref?.current?.dismiss();
    reset({});
  };

  const handleCreateBooking = (values: FieldValues) => {
    values.customerPhone = formatPhoneNumberForSubmit(values?.customerPhone);

    if (!selectedDate || !selectedTime) {
      toast.warning(t("bookings.add_modal.date_time_warning"));
      return;
    }

    createBooking({
      onError: refetchTimeSlots,
      onCompleted: handleCreateBookingCompleted,
      variables: {
        data: {
          businessId,
          startAt: selectedTime?.toJSON(),
          date: selectedDate?.format("YYYY-MM-DD"),
          ...values,
        },
      },
    });
  };

  const services = data?.services?.items || [];
  const timeSlots = timeSlotsData?.getAvailableTimeSlots;
  const serviceOptions: SelectOptionType[] = services?.map((service) => ({
    value: service?._id,
    label: service?.title[locale],
  }));

  const handleGetErrorMessage = getErrorMessage(t);

  return (
    <CustomBottomSheetModal
      ref={ref}
      onChange={handleModalChange}
      footerComponent={() => (
        <View style={styles.footerActionWrapper}>
          <Button
            size="lg"
            color="secondary"
            startIcon={<PlusIcon />}
            onPress={handleSubmit(handleCreateBooking)}
          >
            {t("actions.add")}
          </Button>
        </View>
      )}
    >
      <Flex gap={3}>
        <Controller
          name="serviceId"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              loading={loading}
              options={serviceOptions}
              sheetTitle="Select service"
              inputProps={{
                error: !!error,
                required: true,
                label: "Service",
                helperText: handleGetErrorMessage(error),
                placeholder: "Select one of you sgervices",
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="customerFullName"
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              required
              error={!!error}
              label={t("labels.customerFullName")}
              helperText={handleGetErrorMessage(error)}
              placeholder={t("placeholders.customerFullName")}
            />
          )}
        />
        <Controller
          control={control}
          name="customerPhone"
          rules={{ minLength: 9, maxLength: 9, required: true }}
          render={({ field, fieldState: { error } }) => (
            <PhoneInput
              {...field}
              required
              error={!!error}
              label={t("labels.customerPhone")}
              placeholder={t("placeholders.customerPhone")}
              helperText={handleGetErrorMessage(error, { min: 9, max: 9 })}
            />
          )}
        />
        <ServiceDateTimePicker
          loading={timeSlotsLoading}
          refetch={refetchTimeSlots}
          timeSlots={timeSlots || []}
          onSelectDate={setSelectedDate}
          onSelectTime={setSelectedTime}
          createBookingLoading={createBookingLoading}
        />
      </Flex>
    </CustomBottomSheetModal>
  );
}

const styles = StyleSheet.create(({ space }) => ({
  footerActionWrapper: {
    paddingBlock: space(3),
    paddingInline: space(2),
  },
}));
