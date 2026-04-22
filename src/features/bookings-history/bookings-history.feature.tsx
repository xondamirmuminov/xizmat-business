import { debounce } from "lodash";
import dayjs, { Dayjs } from "dayjs";
import { NetworkStatus } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@apollo/client/react";
import { useRef, useMemo, useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Platform, ActivityIndicator } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { useAuthStore } from "@/store";
import { Flex, Input, Button } from "@/components";
import { BookingType, PageInfoType } from "@/types";
import { SearchIcon, CalendarIcon } from "@/assets";

import { BUSINESS_BOOKINGS_QUERY } from "./api";
import { BookingHistoryCard } from "./components";
import { BookingDatePickerModal } from "./components/date-picker-modal";

export function BookingsHistory() {
  const { user, businessId } = useAuthStore();
  const datePickerModalRef = useRef<BottomSheetModal>(null);
  const [selectedDate, setSelectedDate] = useState<null | Dayjs>(null);
  const [searchInputValue, setSearchInputValue] = useState<string>();

  const { data, refetch, loading, fetchMore, networkStatus } = useQuery<{
    businessBookings: { items: BookingType[]; pageInfo: PageInfoType };
  }>(BUSINESS_BOOKINGS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      limit: 20,
      businessId,
      providerId: user?._id,
      search: searchInputValue || undefined,
      endDate: selectedDate?.endOf("date")?.toISOString(),
      startDate: selectedDate?.startOf("date")?.toISOString(),
    },
  });

  const handleOpenAndroidTimePicker = () => {
    DateTimePickerAndroid.open({
      mode: "date",
      maximumDate: dayjs().toDate(),
      value: (selectedDate || dayjs())?.toDate(),
      neutralButton: { label: "Clear", textColor: "gray" },
      onChange: (event, date) => {
        if (event?.type === "neutralButtonPressed") {
          setSelectedDate(null);
          return;
        }

        if (date && event?.type !== "dismissed") {
          setSelectedDate(dayjs(date));
        }
      },
    });
  };

  const handlePresentDatePickerModal = () => {
    datePickerModalRef?.current?.present();
  };

  const debouncedSetSearchInputValue = useMemo(
    () => debounce((value) => setSearchInputValue(value), 500),
    [],
  );

  const handleChangeSearchInput = (value: string) => {
    if (!value) {
      setSearchInputValue("");
    }

    debouncedSetSearchInputValue(value);
  };

  const handleReachListEnd = () => {
    if (pageInfo?.hasNextPage && !refreshing && !loading) {
      fetchMore({
        variables: {
          limit: 20,
          businessId,
          providerId: user?._id,
          page: (pageInfo?.currentPage || 0) + 1,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            fetchMoreResult.businessBookings?.items?.length === 0
          ) {
            return previousResult;
          }

          return {
            businessBookings: {
              pageInfo: fetchMoreResult?.businessBookings?.pageInfo,
              items: previousResult.businessBookings?.items?.concat(
                fetchMoreResult?.businessBookings?.items,
              ),
            },
          };
        },
      });
    }
  };

  const bookings = data?.businessBookings?.items;
  const pageInfo = data?.businessBookings?.pageInfo;
  const refreshing = networkStatus === NetworkStatus.refetch;

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <Flex
          gap={1.5}
          direction="row"
          alignItems="center"
          style={styles.headerContainer}
        >
          <Input
            icon={<SearchIcon />}
            onChange={handleChangeSearchInput}
            containerStyle={styles.searchInputContainer}
            placeholder="Search with booking number, customer name or phone"
          />
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<CalendarIcon />}
            onPress={
              Platform?.OS === "android"
                ? handleOpenAndroidTimePicker
                : handlePresentDatePickerModal
            }
          />
        </Flex>
        <FlashList
          data={bookings}
          refreshing={refreshing}
          onRefresh={() => refetch()}
          onEndReached={handleReachListEnd}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(booking) => booking?._id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          ListFooterComponent={
            refreshing ? <ActivityIndicator size="small" /> : null
          }
          renderItem={({ item: booking }) => (
            <BookingHistoryCard booking={booking} />
          )}
        />
        <BookingDatePickerModal
          ref={datePickerModalRef}
          onSelectDate={setSelectedDate}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: {
    flex: 1,
  },
  listStyle: {
    padding: space(2),
  },
  headerContainer: {
    padding: space(2),
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    width: "auto",
  },
}));
