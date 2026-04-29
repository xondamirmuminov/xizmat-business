import { View, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useRef, useImperativeHandle } from "react";
import { StyleSheet } from "react-native-unistyles";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { BookingType } from "@/types";
import { Flex, Empty, Button } from "@/components";

import { AnimatedQueueCard, QueueCardSkeleton } from "../animated-queue-card";

const spacing = 16;
const itemSize = 420;
const itemFullSize = itemSize + spacing;

type Props = {
  ref?: any;
  loading?: boolean;
  bookings: BookingType[];
  onAddBooking: () => void;
  activeInProgressBooking?: BookingType;
  onCancel: (bookingId: string) => void;
};

export function QueueList({
  ref,
  loading,
  bookings,
  onCancel,
  onAddBooking,
  activeInProgressBooking,
}: Props) {
  const { t } = useTranslation();
  const scrollY = useSharedValue(0);
  const flatListRef = useRef<FlatList<BookingType>>(null);

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / itemFullSize;
  });

  const renderSkeleton = () => {
    return (
      <Flex gap={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <QueueCardSkeleton key={"queue-skeleton" + index} />
        ))}
      </Flex>
    );
  };

  const rawActiveIndex = bookings.findIndex(
    (booking) => booking?._id === activeInProgressBooking?._id,
  );
  const activeInProgressBookingIndex =
    rawActiveIndex >= 0 ? rawActiveIndex : 0;

  const initialScrollIndex =
    bookings.length > 0 ? activeInProgressBookingIndex : undefined;

  useImperativeHandle(ref, () => ({
    adjustScrollForInsert: (insertIndex: number) => {
      const currentIndex = Math.round(scrollY.value);

      if (insertIndex !== -1 && insertIndex <= currentIndex) {
        requestAnimationFrame(() => {
          flatListRef.current?.scrollToOffset({
            animated: false,
            offset: (currentIndex + 1) * itemFullSize,
          });
        });
      }
    },
  }));

  return (
    <Animated.FlatList
      data={bookings}
      ref={flatListRef}
      onScroll={handleScroll}
      decelerationRate="fast"
      scrollEventThrottle={16}
      snapToInterval={itemFullSize}
      initialScrollIndex={initialScrollIndex}
      contentContainerStyle={[styles.listContainer]}
      keyExtractor={(booking) => (booking as BookingType)?._id}
      ItemSeparatorComponent={() => <View style={{ height: spacing }}></View>}
      getItemLayout={(_, index) => ({
        index,
        length: itemFullSize,
        offset: itemFullSize * index,
      })}
      renderItem={({ item, index }) => {
        const booking = item as BookingType;

        return (
          <AnimatedQueueCard
            index={index}
            scrollY={scrollY}
            booking={booking}
            onCancel={() => onCancel(booking?._id)}
          />
        );
      }}
      ListEmptyComponent={
        loading ? (
          renderSkeleton()
        ) : (
          <Empty
            title={t("queues.empty.title")}
            description={t("queues.empty.description")}
          >
            <Button size="lg" color="secondary" onPress={onAddBooking}>
              {t("bookings.actions.add_booking")}
            </Button>
          </Empty>
        )
      }
    />
  );
}

const styles = StyleSheet.create(({ space }) => ({
  listContainer: {
    position: "relative",
    paddingTop: space(3),
    paddingInline: space(2),
    paddingBottom: space(12),
  },
}));
