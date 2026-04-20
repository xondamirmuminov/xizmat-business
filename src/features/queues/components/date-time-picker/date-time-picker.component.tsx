import { View } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";

import { TimeSlotType } from "@/types";
import { RefreshIcon, ClockAlertIcon } from "@/assets";
import { getRemainingDatesInMonth } from "@/lib/helpers";
import { Flex, Empty, Button, Typography } from "@/components";

import { ServiceDateTimePickerDateItem } from "../date-item";
import {
  ServiceDateTimePickerTimeItem,
  ServiceDateTimePickerTimeItemSkeleton,
} from "../time-item";

type Props = {
  loading: boolean;
  refetch: VoidFunction;
  timeSlots: TimeSlotType[];
  createBookingLoading?: boolean;
  onSelectDate?: (date: Dayjs) => void;
  onSelectTime?: (time: null | Dayjs) => void;
};

export function ServiceDateTimePicker({
  loading,
  refetch,
  timeSlots,
  onSelectDate,
  onSelectTime,
  createBookingLoading,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<null | Dayjs>(null);

  const { t } = useTranslation();

  const remainingDates = getRemainingDatesInMonth();

  const handleSelectTime = (time: Dayjs) => {
    if (!selectedTime?.isSame(time)) {
      setSelectedTime(time);
      onSelectTime?.(time);
    }
  };

  const handleSelectDate = (date: Dayjs) => {
    if (!selectedDate?.isSame(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
      onSelectDate?.(date);
      onSelectTime?.(null);
    }
  };

  const gap = 8;
  const numCols = 3;

  const itemGap = (gap * (numCols - 1)) / numCols;

  const renderTimeSlotsSkeleton = () => {
    return (
      <Flex gap={1} direction="row" flexWrap="wrap">
        {Array.from({ length: 12 }).map((_, index) => (
          <ServiceDateTimePickerTimeItemSkeleton
            key={"time-slot-skeleton" + index}
          />
        ))}
      </Flex>
    );
  };

  useEffect(() => {
    if (!loading && timeSlots?.length && selectedTime && selectedDate) {
      const isTimeIncluded = timeSlots?.some((slot) =>
        dayjs(slot?.startAt).isSame(selectedTime?.date(selectedDate.date())),
      );

      if (!isTimeIncluded) {
        setSelectedTime(null);
        onSelectTime?.(null);
      }
    }
  }, [timeSlots, loading]);

  return (
    <Flex gap={2}>
      <Flex gap={1.5}>
        <Typography weight="medium">{dayjs().format("MMMM YYYY")}</Typography>
        <FlashList
          horizontal
          data={remainingDates}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item?.toString()}
          ItemSeparatorComponent={() => <View style={{ width: 12 }}></View>}
          renderItem={({ item: date }) => {
            const today = dayjs();
            const isSelected = selectedDate.isSame(date, "day");
            const isDisabled =
              date.date() !== today.date() &&
              date?.date() !== today?.date() + 1;

            return (
              <ServiceDateTimePickerDateItem
                date={date}
                selected={isSelected}
                onPress={handleSelectDate}
                disabled={isDisabled || createBookingLoading}
              />
            );
          }}
        />
      </Flex>
      <Flex gap={1.5}>
        <Typography size="text-sm" weight="medium">
          {t("booking_time_picker.time_picker_label")}
        </Typography>
        <FlashList
          numColumns={3}
          data={timeSlots}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.startAt?.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
          renderItem={({ index, item: { startAt: time } }) => {
            const isSelected =
              selectedTime?.isSame(dayjs(time), "hour") &&
              selectedTime?.isSame(dayjs(time), "minute");

            const marginLeft = ((index % numCols) / (numCols - 1)) * itemGap;
            const marginRight = itemGap - marginLeft;

            return (
              <ServiceDateTimePickerTimeItem
                time={dayjs(time)}
                selected={isSelected}
                onPress={handleSelectTime}
                disabled={createBookingLoading}
                style={{ marginLeft, marginRight }}
              />
            );
          }}
          ListEmptyComponent={
            loading ? (
              renderTimeSlotsSkeleton()
            ) : (
              <Empty
                icon={<ClockAlertIcon />}
                title={t("booking_time_picker.empty.title")}
                description={t("booking_time_picker.empty.description")}
              >
                <Button
                  size="sm"
                  color="secondary"
                  variant="outlined"
                  onPress={() => refetch()}
                  startIcon={<RefreshIcon />}
                >
                  {t("actions.refresh")}
                </Button>
              </Empty>
            )
          }
        />
      </Flex>
    </Flex>
  );
}
