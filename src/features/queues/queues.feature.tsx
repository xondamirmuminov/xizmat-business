import dayjs from "dayjs";
import { View } from "react-native";
import { useRef, useState } from "react";
import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { StyleSheet } from "react-native-unistyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store";
import { fragmentRegistry } from "@/graphql";
import { BookingType, PageInfoType, BookingStatusEnum } from "@/types";

import { QueueList } from "./components";
import { BookingCancelModal } from "./components/cancel-modal";
import { BOOKING_CARD_FRAGMENT, BUSINESS_BOOKINGS_QUERY } from "./api";

fragmentRegistry.register(BOOKING_CARD_FRAGMENT);

export function Queues() {
  const { user, businessId } = useAuthStore();
  const cancelModalRef = useRef<BottomSheetModal>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");

  const { data, loading, fetchMore, networkStatus } = useQuery<{
    businessBookings: { items: BookingType[]; pageInfo: PageInfoType };
  }>(BUSINESS_BOOKINGS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 20,
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

  const pageInfo = data?.businessBookings?.pageInfo;
  const bookings = data?.businessBookings?.items || [];
  const refreshing = networkStatus === NetworkStatus.refetch;

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <View style={styles.container}>
          <QueueList
            loading={loading}
            pageInfo={pageInfo}
            bookings={bookings}
            fetchMore={fetchMore}
            refreshing={refreshing}
            onCancel={handleCancelBooking}
          />
        </View>
        <BookingCancelModal
          ref={cancelModalRef}
          bookingId={selectedBookingId}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
}));
