import dayjs, { Dayjs } from "dayjs";
import { useState, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Flex, Button, CustomBottomSheetModal } from "@/components";

type Props = {
  ref: RefObject<null | BottomSheetModal>;
  onSelectDate: (date: null | Dayjs) => void;
};

export function BookingDatePickerModal({ ref, onSelectDate }: Props) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const { t } = useTranslation();

  const handleShowResults = () => {
    onSelectDate(selectedDate ?? dayjs());
    ref?.current?.close();
  };

  const handleClear = () => {
    onSelectDate(null);
    ref?.current?.close();
  };

  return (
    <CustomBottomSheetModal
      index={1}
      ref={ref}
      title={t("bookings.select_date")}
    >
      <Flex gap={2}>
        <DateTimePicker
          mode="date"
          display={"inline"}
          accentColor="#00b7b5"
          value={selectedDate.toDate()}
          maximumDate={dayjs().toDate()}
          onChange={(_, date) => setSelectedDate(dayjs(date))}
        />
        <Flex gap={2} direction="row">
          <Button
            size="lg"
            fullWidth
            color="secondary"
            variant="outlined"
            onPress={handleClear}
          >
            {t("actions.clear")}
          </Button>
          <Button fullWidth size="lg" onPress={handleShowResults}>
            {t("actions.show_results")}
          </Button>
        </Flex>
      </Flex>
    </CustomBottomSheetModal>
  );
}
