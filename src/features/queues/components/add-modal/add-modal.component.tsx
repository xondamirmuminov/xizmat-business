import { View } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "sonner-native";
import { useState, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native-unistyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react";

import { useAuthStore } from "@/store";
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "@/assets";
import { ServiceType, TimeSlotType, LocalizedTextType } from "@/types";
import {
  formatPrice,
  getErrorMessage,
  formatPhoneNumberForSubmit,
} from "@/lib/helpers";
import {
  Flex,
  Input,
  Button,
  PhoneInput,
  Typography,
  SelectableCard,
  CustomBottomSheetModal,
  SelectableCardSkeleton,
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
  const { businessId } = useAuthStore();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<null | Dayjs>(null);

  const { reset, trigger, control, handleSubmit } = useForm({
    mode: "onChange",
  });

  const { t, i18n } = useTranslation();
  const locale = i18n?.language as keyof LocalizedTextType;

  const [getServices, { data }] = useLazyQuery<{
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

  const handleNext = async () => {
    const isValid = await trigger("serviceId");

    if (isValid) {
      setActiveStep(1);
    }
  };

  const handleCreateBookingCompleted = () => {
    refetchTimeSlots();
    toast.success(t("bookings.add_modal.success_message"));
    ref?.current?.dismiss();
    reset({});
    setActiveStep(0);
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

  const renderCategoriesSkeleton = () => (
    <Flex gap={2}>
      {Array.from({ length: 5 }).map((_, index) => (
        <SelectableCardSkeleton hideImage key={"category-skeleton" + index} />
      ))}
    </Flex>
  );

  const services = data?.services?.items || [];
  const timeSlots = timeSlotsData?.getAvailableTimeSlots;

  const handleGetErrorMessage = getErrorMessage(t);

  return (
    <CustomBottomSheetModal
      ref={ref}
      index={2}
      onChange={handleModalChange}
      title={t("bookings.add_modal.title")}
      footerComponent={() => (
        <View style={styles.footerActionWrapper}>
          {activeStep === 0 ? (
            <Button
              size="lg"
              color="secondary"
              onPress={handleNext}
              endIcon={<ChevronRightIcon />}
            >
              {t("labels.next")}
            </Button>
          ) : (
            <Flex gap={2} direction="row">
              <Button
                fullWidth
                size="lg"
                color="secondary"
                variant="outlined"
                startIcon={<ChevronLeftIcon />}
                onPress={() => setActiveStep(0)}
              >
                {t("actions.back")}
              </Button>
              <Button
                fullWidth
                size="lg"
                color="secondary"
                startIcon={<PlusIcon />}
                onPress={handleSubmit(handleCreateBooking)}
              >
                {t("actions.add")}
              </Button>
            </Flex>
          )}
        </View>
      )}
    >
      {activeStep === 0 ? (
        <Controller
          name="serviceId"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Flex gap={1.5}>
              <Typography size="text-md" weight="medium">
                {t("bookings.add_modal.select_service")}
              </Typography>
              {!!error && (
                <Typography color="error" size="text-sm">
                  {handleGetErrorMessage(error)}
                </Typography>
              )}
              <FlashList
                data={services}
                keyExtractor={(service) => service?._id}
                ListEmptyComponent={renderCategoriesSkeleton}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 16 }}></View>
                )}
                renderItem={({ item: service }) => {
                  const isSelected = field?.value === service?._id;

                  return (
                    <SelectableCard
                      hideImage
                      isSelected={isSelected}
                      onSelect={() => field?.onChange(service?._id)}
                      item={{
                        title: service?.title[locale],
                        subTitle: formatPrice(service?.price),
                      }}
                    />
                  );
                }}
              />
            </Flex>
          )}
        />
      ) : (
        <Flex gap={3}>
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
      )}
    </CustomBottomSheetModal>
  );
}

const styles = StyleSheet.create(({ space }) => ({
  footerActionWrapper: {
    paddingTop: space(3),
    paddingBottom: space(4),
    paddingInline: space(2),
  },
}));
