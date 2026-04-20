import dayjs from "dayjs";
import { debounce } from "lodash";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { StyleSheet } from "react-native-unistyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useMemo, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store";
import { fragmentRegistry } from "@/graphql";
import { PlusIcon, SearchIcon } from "@/assets";
import { Flex, Input, Button, Typography } from "@/components";
import { BookingType, PageInfoType, BookingStatusEnum } from "@/types";

import { QueueList, AddBookingModal } from "./components";
import { BookingCancelModal } from "./components/cancel-modal";
import { BOOKING_CREATED_SUBSCRIPTION } from "./api/subscriptions";
import {
  BOOKING_CARD_FRAGMENT,
  BUSINESS_BOOKINGS_QUERY,
  ACTIVE_IN_PROGRESS_BOOKING_QUERY,
} from "./api";

fragmentRegistry.register(BOOKING_CARD_FRAGMENT);

export function Queues() {
  const { user, businessId } = useAuthStore();
  const cancelModalRef = useRef<BottomSheetModal>(null);
  const addBookingModalRef = useRef<BottomSheetModal>(null);
  const [searchInputValue, setSearchInputValue] = useState<string>();
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");

  const { t } = useTranslation();

  const { data, loading, subscribeToMore } = useQuery<{
    businessBookings: {
      items: BookingType[];
      pageInfo: PageInfoType;
      completedBookingsCount: number;
    };
  }>(BUSINESS_BOOKINGS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 30,
      businessId,
      providerId: user?._id,
      endDate: dayjs().endOf("hour"),
      startDate: dayjs().startOf("hour"),
      search: searchInputValue || undefined,
      status: [
        BookingStatusEnum.IN_PROGRESS,
        BookingStatusEnum.CONFIRMED,
        BookingStatusEnum.COMPLETED,
        BookingStatusEnum.DECLINED,
      ],
    },
  });

  const { data: activeInProgressBookingData } = useQuery<{
    activeInProgressBooking: BookingType;
  }>(ACTIVE_IN_PROGRESS_BOOKING_QUERY, {
    variables: {
      businessId,
      providerId: user?._id,
    },
  });

  const handleCancelBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    cancelModalRef?.current?.present();
  };

  const handleAddBooking = () => {
    addBookingModalRef?.current?.present();
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

  useEffect(() => {
    if (data) {
      const unsubscribe = subscribeToMore({
        document: BOOKING_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newItem = (subscriptionData.data as any)
            ?.providerBookingCreated as BookingType;

          if (
            prev?.businessBookings?.items?.find(
              (item) => item?._id === newItem?._id,
            ) ||
            dayjs(newItem?.dateKey)?.isSame(dayjs(), "date")
          ) {
            return prev;
          }

          return {
            businessBookings: {
              ...prev?.businessBookings,
              items: [...(prev?.businessBookings?.items || []), newItem],
              pageInfo: {
                ...prev?.businessBookings?.pageInfo,
                totalItems:
                  (prev?.businessBookings?.pageInfo?.totalItems || 0) + 1,
              },
            },
          } as any;
        },
      });
      return () => {
        unsubscribe();
      };
    }
  }, [data, subscribeToMore]);

  useEffect(() => {
    return () => debouncedSetSearchInputValue.cancel();
  }, [debouncedSetSearchInputValue]);

  const pageInfo = data?.businessBookings?.pageInfo;
  const bookings = data?.businessBookings?.items || [];
  const activeInProgressBooking =
    activeInProgressBookingData?.activeInProgressBooking;
  const completedBookingsCount =
    data?.businessBookings?.completedBookingsCount ?? 0;

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          <Flex gap={3} style={styles.headerContainer}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography size="text-lg" weight="medium">
                {dayjs().format("dddd, MMMM DD")}
              </Typography>
              <Typography size="display-xs" weight="semibold">
                {completedBookingsCount}/{pageInfo?.totalItems}
              </Typography>
            </Flex>
            <Input
              size="lg"
              icon={<SearchIcon />}
              onChange={handleChangeSearchInput}
              placeholder="Search with booking number, customer name or phone"
            />
          </Flex>
          <QueueList
            loading={loading}
            bookings={bookings}
            onCancel={handleCancelBooking}
            activeInProgressBooking={activeInProgressBooking}
          />
          <Flex alignItems="center" style={styles.footerContainer}>
            <View style={styles.footerActionWrapper}>
              <Button
                size="lg"
                radius="circular"
                color="secondary"
                startIcon={<PlusIcon />}
                onPress={handleAddBooking}
              >
                {t("bookings.actions.add_booking")}
              </Button>
            </View>
          </Flex>
        </View>
        <BookingCancelModal
          ref={cancelModalRef}
          bookingId={selectedBookingId}
        />
        <AddBookingModal ref={addBookingModalRef} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: space(2),
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  footerActionWrapper: {
    borderRadius: 20,
    boxShadow: `0px 0px 16px 0px ${colors.slate8}`,
  },
  footerContainer: {
    width: "100%",
    bottom: space(2.5),
    position: "absolute",
    backgroundColor: "transparent",
  },
  headerContainer: {
    borderBottomWidth: 1,
    paddingTop: space(1),
    paddingInline: space(2),
    paddingBottom: space(2.5),
    borderBottomColor: colors.slate4,
  },
}));
