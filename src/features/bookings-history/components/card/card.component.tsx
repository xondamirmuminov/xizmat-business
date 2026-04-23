import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import calendar from "dayjs/plugin/calendar";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { BookingType } from "@/types";
import { BOOKING_STATUS } from "@/lib/constants";
import { EyeIcon, AvatarPlaceholder } from "@/assets";
import { formatPhoneNumberForDisplay } from "@/lib/helpers";
import { Chip, Flex, Button, Typography } from "@/components";

type Props = {
  booking: BookingType;
};

dayjs.extend(calendar);

export function BookingHistoryCard({ booking }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const status = BOOKING_STATUS[booking?.status];

  const handleViewDetails = () => {
    router.navigate({
      params: { id: booking?._id },
      pathname: "/booking-info/[id]",
    });
  };

  return (
    <Flex gap={2} style={styles.card}>
      <Flex
        gap={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          weight="semibold"
          numberOfLines={2}
          style={styles.flexShrink}
        >
          {booking?.isStandBy
            ? t("bookings.status.standby")
            : dayjs(booking?.startAt).calendar(null, {
                nextWeek: "dddd - HH:mm",
                sameElse: "MMM DD, YYYY",
                lastWeek: `[${t("date.last")}] dddd`,
                sameDay: t("date.today_at", { format: "HH:mm" }),
                nextDay: t("date.tomorrow_at", { format: "HH:mm" }),
                lastDay: t("date.yesterday_at", { format: "HH:mm" }),
              })}
        </Typography>
        <Chip size="xs" icon={status?.icon} color={status?.color}>
          {t(`bookings.status.${booking.status?.toLowerCase()}`)}
        </Chip>
      </Flex>
      <Flex gap={1.5} direction="row">
        <Image
          contentFit="cover"
          style={styles.serviceImage}
          placeholderContentFit="cover"
          placeholder={AvatarPlaceholder}
          source={{
            uri: booking?.user?.avatar,
          }}
        />
        <Flex gap={0.5}>
          <Typography weight="medium">
            {booking?.user?.fullName || booking?.guestFullName}
          </Typography>
          <Typography
            size="text-sm"
            numberOfLines={1}
            color="secondary"
            ellipsizeMode="tail"
            style={styles.flexShrink}
          >
            {formatPhoneNumberForDisplay(
              booking?.user?.phone || booking?.guestPhone || "",
            )}
          </Typography>
        </Flex>
      </Flex>
      <Flex gap={1}>
        <Typography size="text-sm" numberOfLines={1} color="secondary">
          {dayjs(booking?.startAt).format("HH:mm")} -{" "}
          {dayjs(booking?.endAt).format("HH:mm")}
        </Typography>
        <Typography size="text-sm" numberOfLines={1} color="secondary">
          #{booking?.bookingId}
        </Typography>
      </Flex>
      <Flex gap={1} direction="row">
        <Button
          size="sm"
          fullWidth
          variant="ghost"
          color="secondary"
          startIcon={<EyeIcon />}
          onPress={handleViewDetails}
        >
          {t("bookings.actions.view")}
        </Button>
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  flexShrink: { flexShrink: 1 },
  serviceImage: {
    width: 48,
    height: 48,
    borderRadius: 48,
  },
  infoItemIcon: {
    width: 16,
    height: 16,
    color: colors.textSecondary,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: space(2),
    borderColor: colors.slate6,
  },
}));
