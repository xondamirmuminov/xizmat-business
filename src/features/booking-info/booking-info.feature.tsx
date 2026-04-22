import dayjs from "dayjs";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { StyleSheet } from "react-native-unistyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams } from "expo-router";
import { ApolloCache, NetworkStatus } from "@apollo/client";
import { View, ScrollView, RefreshControl } from "react-native";

import { XIcon } from "@/assets";
import { fragmentRegistry } from "@/graphql";
import { BOOKING_STATUS } from "@/lib/constants";
import { BookingType, ServiceType, BookingStatusEnum } from "@/types";
import {
  Chip,
  Flex,
  Button,
  Divider,
  Skeleton,
  Typography,
  ServiceCard,
  ServiceCardSkeleton,
} from "@/components";

import { BOOKING_QUERY, BOOKING_INFO_FRAGMENT } from "./api";
import { BookingCancelModal } from "../queues/components/cancel-modal";
import {
  BookingInfoCustomerCard,
  BookingInfoCustomerCardSkeleton,
} from "./components";

fragmentRegistry.register(BOOKING_INFO_FRAGMENT);

export function BookingInfo() {
  const { id } = useLocalSearchParams();
  const cancelModalRef = useRef<BottomSheetModal>(null);

  const { t } = useTranslation();

  const { data, loading, refetch, networkStatus } = useQuery<{
    booking: BookingType;
  }>(BOOKING_QUERY, {
    skip: !id,
    notifyOnNetworkStatusChange: true,
    variables: {
      bookingId: id,
    },
  });

  const handleCancelBooking = () => {
    cancelModalRef?.current?.present();
  };

  const handleUpdateApolloCacheOnCancel = (
    cache: ApolloCache,
    data:
      | null
      | undefined
      | {
          updateBookingStatus: BookingType;
        },
  ) => {
    if (data?.updateBookingStatus) {
      cache.writeFragment({
        fragment: BOOKING_INFO_FRAGMENT,
        id: cache.identify(data?.updateBookingStatus),
        data: {
          ...data?.updateBookingStatus,
        },
      });
    }
  };

  const booking: undefined | BookingType = data?.booking;
  const refreshing = networkStatus === NetworkStatus.refetch;
  const status = BOOKING_STATUS[booking?.status || BookingStatusEnum.CONFIRMED];
  const isBookingCompleted = booking?.status === BookingStatusEnum.COMPLETED;
  const isBookingCancelled =
    booking?.status === BookingStatusEnum.CANCELLED ||
    booking?.status === BookingStatusEnum.DECLINED;
  const service: undefined | ServiceType = booking?.service
    ? {
        ...booking?.service,
        business: booking?.business,
      }
    : undefined;

  return (
    <View style={styles.screenContainer}>
      <Stack.Screen
        options={{
          title: "Booking Details",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={refreshing} />
        }
      >
        <Flex gap={2}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex gap={0.5}>
              <Typography size="text-sm" color="secondary">
                Booking ID
              </Typography>
              {loading ? (
                <Skeleton width={140} typographySize="display-xs" />
              ) : (
                <Typography weight="semibold" size="display-xs">
                  #{booking?.bookingId}
                </Typography>
              )}
            </Flex>
            <Chip size="sm" icon={status?.icon} color={status?.color}>
              {t(
                `bookings.status.${(booking?.status || BookingStatusEnum.CONFIRMED).toLowerCase()}`,
              )}
            </Chip>
          </Flex>
          <Flex>
            <Typography size="text-sm" color="secondary">
              Date
            </Typography>
            {loading ? (
              <Skeleton width={120} typographySize="text-lg" />
            ) : (
              <Typography size="text-lg" weight="medium">
                {dayjs(booking?.startAt).format("MMM DD, YYYY")}
              </Typography>
            )}
          </Flex>
          <Flex gap={3} direction="row">
            <Flex flex={1}>
              <Typography size="text-sm" color="secondary">
                Starts at
              </Typography>
              {loading ? (
                <Skeleton width={80} typographySize="text-lg" />
              ) : (
                <Typography size="text-lg" weight="medium">
                  ~ {dayjs(booking?.startAt).format("HH:mm")}
                </Typography>
              )}
            </Flex>
            <Flex flex={1}>
              <Typography size="text-sm" color="secondary">
                Ends at
              </Typography>
              {loading ? (
                <Skeleton width={80} typographySize="text-lg" />
              ) : (
                <Typography size="text-lg" weight="medium">
                  ~ {dayjs(booking?.endAt).format("HH:mm")}
                </Typography>
              )}
            </Flex>
          </Flex>

          <Flex gap={1}>
            <Typography size="text-sm" color="secondary">
              Service
            </Typography>
            {loading ? (
              <ServiceCardSkeleton />
            ) : (
              <ServiceCard service={service as ServiceType} />
            )}
          </Flex>
          <Flex gap={1}>
            <Typography size="text-sm" color="secondary">
              Customer
            </Typography>
            {loading ? (
              <BookingInfoCustomerCardSkeleton />
            ) : (
              <BookingInfoCustomerCard
                avatar={booking?.user?.avatar}
                phone={booking?.user?.phone || booking?.guestPhone}
                fullName={booking?.user?.fullName || booking?.guestFullName}
              />
            )}
          </Flex>
          {!isBookingCancelled && !isBookingCompleted && (
            <>
              <Divider />
              <Flex gap={2.5} alignItems="flex-start">
                <Flex gap={0.5}>
                  <Typography color="error" size="text-lg" weight="medium">
                    {t("bookings.actions.cancel")}
                  </Typography>
                  <Typography size="text-xs" color="secondary">
                    {t("bookings.cancel.description")}
                  </Typography>
                </Flex>
                <Button
                  color="error"
                  variant="ghost"
                  startIcon={<XIcon />}
                  onPress={handleCancelBooking}
                >
                  {t("bookings.actions.cancel")}
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </ScrollView>
      <BookingCancelModal
        ref={cancelModalRef}
        bookingId={booking?._id || (id as string)}
        onUpdateApolloCache={handleUpdateApolloCacheOnCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  userAvatar: { width: 56, height: 56, borderRadius: 28 },
  container: {
    paddingBlock: space(3),
    paddingInline: space(2),
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors?.background,
  },
}));
