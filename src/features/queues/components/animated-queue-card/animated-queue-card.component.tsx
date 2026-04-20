import dayjs from "dayjs";
import { Image } from "expo-image";
import { Linking } from "react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { BOOKING_STATUS } from "@/lib/constants";
import { formatPhoneNumberForDisplay } from "@/lib/helpers";
import { Flex, Chip, Button, Typography } from "@/components";
import { XIcon, PhoneIcon, AvatarPlaceholder } from "@/assets";
import { BookingType, BookingStatusEnum, LocalizedTextType } from "@/types";
import SlideToConfirm from "@/components/swipe-button/swipe-button.component";

import {
  BOOKING_CARD_FRAGMENT,
  UPDATE_BOOKING_STATUS_MUTATION,
} from "../../api";

type Props = {
  index: number;
  booking: BookingType;
  onCancel?: VoidFunction;
  scrollY: SharedValue<number>;
};

export function AnimatedQueueCard({
  index,
  scrollY,
  booking,
  onCancel,
}: Props) {
  const [isStarted, setIsStarted] = useState(
    booking?.status === BookingStatusEnum.IN_PROGRESS,
  );
  const slideButtonRef = useRef<{ reset: VoidFunction }>(null);

  const {
    theme: { colors },
  } = useUnistyles();

  const { i18n } = useTranslation();
  const locale = i18n.language as keyof LocalizedTextType;

  const animationStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.4, 1, 0.4],
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.95, 1, 0.95],
          ),
        },
      ],
    };
  });

  const handleCall = () => {
    Linking.openURL(`tel:${booking?.user?.phone || booking?.guestPhone}`);
  };

  const [updateBookingStatus] = useMutation<{
    updateBookingStatus: BookingType;
  }>(UPDATE_BOOKING_STATUS_MUTATION);

  const handleConfirmStatusChange = (
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

            if (
              data?.updateBookingStatus?.status === BookingStatusEnum.COMPLETED
            ) {
              cache.modify({
                fields: {
                  businessBookings(existingBookings = {}) {
                    return {
                      ...existingBookings,
                      completedBookingsCount:
                        existingBookings?.completedBookingsCount + 1,
                    };
                  },
                },
              });
            }
          }
        },
      });
    }
  };

  const handleComplete = () => {
    handleConfirmStatusChange(booking?._id, BookingStatusEnum?.COMPLETED);
  };

  const handleStart = () => {
    handleConfirmStatusChange(booking?._id, BookingStatusEnum?.IN_PROGRESS);
    setIsStarted(true);
    slideButtonRef?.current?.reset();
  };

  const isConfirmButtonDisabled =
    booking?.status === BookingStatusEnum.CANCELLED ||
    booking?.status === BookingStatusEnum.COMPLETED ||
    booking?.status === BookingStatusEnum.DECLINED;

  return (
    <Animated.View style={[styles.card, animationStyles]}>
      <Flex gap={4} flex={1} justifyContent="space-between">
        <Flex gap={1.5}>
          <Flex
            gap={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex gap={1}>
              <Typography size="text-sm">#{booking?.bookingId}</Typography>
              <Typography size="text-xl" weight="semibold">
                {dayjs(booking?.startAt).format("HH:mm")} -{" "}
                {dayjs(booking?.endAt).format("HH:mm")}
              </Typography>
            </Flex>
            <Chip
              size="xs"
              icon={BOOKING_STATUS[booking?.status]?.icon}
              color={BOOKING_STATUS[booking?.status]?.color}
            >
              {booking?.status}
            </Chip>
          </Flex>
          <Flex gap={2.5}>
            <Flex gap={0.5} style={styles.infoWrapper}>
              <Typography size="text-sm" weight="medium">
                {booking?.service?.title[locale]}
              </Typography>
              <Typography size="text-sm" weight="medium">
                {booking?.price?.toLocaleString("uz-UZ", {
                  currency: "UZS",
                  style: "currency",
                  minimumFractionDigits: 0,
                })}
              </Typography>
            </Flex>
            <Flex gap={2} style={styles.customerWrapper}>
              <Flex gap={1} direction="row" alignItems="center">
                <Image
                  contentFit="cover"
                  style={styles.userAvatar}
                  placeholderContentFit="cover"
                  placeholder={AvatarPlaceholder}
                  source={{ uri: booking?.user?.avatar }}
                />
                <Flex>
                  <Typography weight="medium">
                    {booking?.user?.fullName || booking?.guestFullName}
                  </Typography>
                  <Typography size="text-sm" color="secondary">
                    {formatPhoneNumberForDisplay(
                      booking?.user?.phone || booking?.guestPhone || "",
                    )}
                  </Typography>
                </Flex>
              </Flex>
              <Flex gap={1} direction="row">
                <Button
                  fullWidth
                  color="error"
                  variant="ghost"
                  onPress={onCancel}
                  startIcon={<XIcon />}
                  disabled={isConfirmButtonDisabled}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  variant="ghost"
                  color="secondary"
                  onPress={handleCall}
                  startIcon={<PhoneIcon />}
                >
                  Call
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap={2}>
          {!isStarted ? (
            <SlideToConfirm
              height={60}
              ref={slideButtonRef}
              onConfirm={handleStart}
              label={"Start the work"}
              confirmedText={"Started"}
              fillColor={colors.primary}
              trackColor={colors.primary}
              disabled={isConfirmButtonDisabled}
            />
          ) : (
            <SlideToConfirm
              height={60}
              onConfirm={handleComplete}
              fillColor={colors.success}
              confirmedText={"Completed"}
              trackColor={colors.success}
              label={"Complete the work"}
              disabled={isConfirmButtonDisabled}
            />
          )}
        </Flex>
      </Flex>
    </Animated.View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 44,
  },
  customerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    paddingBlock: space(2),
    paddingInline: space(2),
    borderColor: colors.slate4,
    backgroundColor: colors.slate2,
  },
  card: {
    height: 420,
    borderWidth: 1,
    borderRadius: 12,
    padding: space(2),
    boxSizing: "border-box",
    paddingBottom: space(3),
    borderColor: colors.slate5,
    backgroundColor: colors.background,
    boxShadow: `${colors.slate4} 0px 4px 12px`,
  },
  infoWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    borderLeftWidth: 4,
    paddingBlock: space(1),
    borderTopLeftRadius: 4,
    paddingInline: space(2),
    borderBottomLeftRadius: 4,
    borderColor: colors.slate4,
    borderLeftColor: colors.primary,
    backgroundColor: colors.primary2,
  },
}));
