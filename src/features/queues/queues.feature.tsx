import dayjs from "dayjs";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useQuery, useMutation } from "@apollo/client/react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store";
import { fragmentRegistry } from "@/graphql";
import { BookingType, PageInfoType, BookingStatusEnum } from "@/types";

import { QueueList } from "./components";
import {
  BOOKING_CARD_FRAGMENT,
  BUSINESS_BOOKINGS_QUERY,
  UPDATE_BOOKING_STATUS_MUTATION,
} from "./api";

fragmentRegistry.register(BOOKING_CARD_FRAGMENT);

export function Queues() {
  const { user, businessId } = useAuthStore();

  const { data, loading } = useQuery<{
    businessBookings: { items: BookingType[]; pageInfo: PageInfoType };
  }>(BUSINESS_BOOKINGS_QUERY, {
    variables: {
      businessId,
      providerId: user?._id,
      endDate: dayjs().endOf("hour"),
      startDate: dayjs().startOf("hour"),
      status: [
        BookingStatusEnum.IN_PROGRESS,
        BookingStatusEnum.CONFIRMED,
        BookingStatusEnum.IN_PROGRESS,
        BookingStatusEnum.DECLINED,
      ],
    },
  });

  const [updateBookingStatus] = useMutation<{
    updateBookingStatus: BookingType;
  }>(UPDATE_BOOKING_STATUS_MUTATION);

  const handleConfirm = (
    bookingId: string,
    bookingStatus: BookingStatusEnum,
  ) => {
    if (bookingId && bookingStatus) {
      updateBookingStatus({
        variables: { id: bookingId, status: bookingStatus },
        update(cache, { data }) {
          if (data?.updateBookingStatus) {
            cache.writeFragment({
              fragment: BOOKING_CARD_FRAGMENT,
              id: cache.identify(data?.updateBookingStatus),
              data: {
                ...data?.updateBookingStatus,
              },
            });
          }
        },
      });
    }
  };

  const bookings = data?.businessBookings?.items || [];

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <View style={styles.container}>
          <QueueList bookings={bookings} onConfirm={handleConfirm} />
        </View>
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
