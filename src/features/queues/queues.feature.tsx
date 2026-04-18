import dayjs from "dayjs";
import { View } from "react-native";
import { useQuery } from "@apollo/client/react";
import { useRef, useState, useEffect } from "react";
import { StyleSheet } from "react-native-unistyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store";
import { fragmentRegistry } from "@/graphql";
import { PlusIcon, SearchIcon } from "@/assets";
import { Flex, Input, Button, Typography } from "@/components";
import { BookingType, PageInfoType, BookingStatusEnum } from "@/types";

import { QueueList } from "./components";
import { BookingCancelModal } from "./components/cancel-modal";
import { BOOKING_CREATED_SUBSCRIPTION } from "./api/subscriptions";
import { BOOKING_CARD_FRAGMENT, BUSINESS_BOOKINGS_QUERY } from "./api";

fragmentRegistry.register(BOOKING_CARD_FRAGMENT);

export function Queues() {
  const { user, businessId } = useAuthStore();
  const cancelModalRef = useRef<BottomSheetModal>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");

  const { data, loading, subscribeToMore } = useQuery<{
    businessBookings: { items: BookingType[]; pageInfo: PageInfoType };
  }>(BUSINESS_BOOKINGS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 30,
      businessId,
      providerId: user?._id,
      endDate: dayjs().endOf("hour"),
      startDate: dayjs().startOf("hour"),
      status: [
        BookingStatusEnum.IN_PROGRESS,
        BookingStatusEnum.CONFIRMED,
        BookingStatusEnum.IN_PROGRESS,
        BookingStatusEnum.COMPLETED,
        BookingStatusEnum.DECLINED,
      ],
    },
  });

  const handleCancelBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    cancelModalRef?.current?.present();
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
            )
          ) {
            return prev;
          }

          return {
            businessBookings: {
              ...prev?.businessBookings,
              items: [...(prev?.businessBookings?.items || []), newItem],
            },
          } as any;
        },
      });
      return () => {
        unsubscribe();
      };
    }
  }, [data, subscribeToMore]);

  const pageInfo = data?.businessBookings?.pageInfo;
  const bookings = data?.businessBookings?.items || [];

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
                {pageInfo?.totalItems}/10
              </Typography>
            </Flex>
            <Input
              size="lg"
              icon={<SearchIcon />}
              placeholder="Search with booking number, customer name or phone"
            />
          </Flex>
          <QueueList
            loading={loading}
            bookings={bookings}
            onCancel={handleCancelBooking}
          />
          <Flex alignItems="center" style={styles.footerContainer}>
            <Button color="secondary" startIcon={<PlusIcon />}>
              Add Booking
            </Button>
          </Flex>
        </View>
        <BookingCancelModal
          ref={cancelModalRef}
          bookingId={selectedBookingId}
        />
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
  headerContainer: {
    borderBottomWidth: 1,
    paddingTop: space(1),
    paddingInline: space(2),
    paddingBottom: space(2.5),
    borderBottomColor: colors.slate4,
  },
  footerContainer: {
    borderTopWidth: 1,
    paddingBlock: space(2),
    paddingInline: space(2),
    borderTopColor: colors.slate4,
    boxShadow: `0px -4px 20px 0px ${colors.slate4}`,
  },
}));
