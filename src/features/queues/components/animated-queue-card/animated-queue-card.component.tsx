import dayjs from "dayjs";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { AvatarPlaceholder } from "@/assets";
import { BookingType, LocalizedTextType } from "@/types";
import { Flex, Divider, Typography } from "@/components";
import { formatPhoneNumberForDisplay } from "@/lib/helpers";
import SlideToConfirm from "@/components/swipe-button/swipe-button.component";

type Props = {
  index: number;
  booking: BookingType;
  scrollY: SharedValue<number>;
};

export function AnimatedQueueCard({ index, scrollY, booking }: Props) {
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

  return (
    <Animated.View style={[styles.card, animationStyles]}>
      <Flex flex={1} justifyContent="space-between">
        <Flex gap={2.5}>
          <Flex gap={1}>
            <Typography size="text-sm">#{booking?.bookingId}</Typography>
            <Typography size="text-xl" weight="semibold">
              {dayjs(booking?.startAt).format("HH:mm")} -{" "}
              {dayjs(booking?.endAt).format("HH:mm")}
            </Typography>
          </Flex>
          <Flex gap={1} direction="row" alignItems="center">
            <Image
              contentFit="cover"
              style={styles.userAvatar}
              placeholderContentFit="cover"
              placeholder={AvatarPlaceholder}
              source={{ uri: booking?.user?.avatar }}
            />
            <Flex>
              <Typography weight="medium">{booking?.user?.fullName}</Typography>
              <Typography size="text-sm" color="secondary">
                {formatPhoneNumberForDisplay(booking?.user?.phone)}
              </Typography>
            </Flex>
          </Flex>
          <Flex style={styles.infoWrapper}>
            <Flex
              gap={1}
              direction="row"
              alignItems="center"
              style={{ padding: 8 }}
              justifyContent="space-between"
            >
              <Typography size="text-sm" color="secondary">
                Service
              </Typography>
              <Typography size="text-sm" weight="medium">
                {booking?.service?.title[locale]}
              </Typography>
            </Flex>
            <Divider space={0} />
            <Flex
              gap={1}
              direction="row"
              alignItems="center"
              style={{ padding: 8 }}
              justifyContent="space-between"
            >
              <Typography size="text-sm" color="secondary">
                Price
              </Typography>
              <Typography size="text-sm" weight="medium">
                {booking?.price?.toLocaleString("uz-UZ", {
                  currency: "UZS",
                  style: "currency",
                  minimumFractionDigits: 0,
                })}
              </Typography>
            </Flex>
          </Flex>
        </Flex>
        <SlideToConfirm
          height={60}
          label="Start the work"
          onConfirm={() => console.log("Confirmed!")}
        />
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
  infoWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    paddingBlock: space(0.5),
    borderColor: colors.slate4,
    backgroundColor: colors.slate2,
  },
  card: {
    height: 360,
    borderWidth: 1,
    borderRadius: 8,
    padding: space(2),
    boxSizing: "border-box",
    paddingBottom: space(3),
    borderColor: colors.slate5,
    backgroundColor: colors.background,
    boxShadow: `${colors.slate4} 0px 4px 12px`,
  },
}));
