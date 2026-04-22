import { View, FlatList } from "react-native";
import { useRef, useImperativeHandle } from "react";
import { StyleSheet } from "react-native-unistyles";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { BookingType } from "@/types";
import { Flex, Empty } from "@/components";

import { AnimatedQueueCard, QueueCardSkeleton } from "../animated-queue-card";

const spacing = 16;
const itemSize = 420;
const itemFullSize = itemSize + spacing;

type Props = {
  ref?: any;
  loading?: boolean;
  bookings: BookingType[];
  activeInProgressBooking?: BookingType;
  onCancel: (bookingId: string) => void;
};

export function QueueList({
  ref,
  loading,
  bookings,
  onCancel,
  activeInProgressBooking,
}: Props) {
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

  const activeInProgressBookingIndex =
    bookings?.findIndex(
      (booking) => booking?._id === activeInProgressBooking?._id,
    ) || 0;

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
      contentContainerStyle={[styles.listContainer]}
      initialScrollIndex={activeInProgressBookingIndex}
      keyExtractor={(booking) => (booking as BookingType)?._id}
      ListEmptyComponent={loading ? renderSkeleton() : <Empty />}
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
