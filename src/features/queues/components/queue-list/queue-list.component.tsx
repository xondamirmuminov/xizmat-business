import { useRef } from "react";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native-unistyles";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { BookingType, BookingStatusEnum } from "@/types";

import { AnimatedQueueCard } from "../animated-queue-card";

const spacing = 16;
const itemSize = 420;
const itemFullSize = itemSize + spacing;

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

type Props = {
  bookings: BookingType[];
  onConfirm: (id: string, status: BookingStatusEnum) => void;
};

export function QueueList({ bookings, onConfirm }: Props) {
  const listRef = useRef(null);

  const { height: windowHeight } = useWindowDimensions();
  const safeHeight = windowHeight;

  const scrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / itemFullSize;
  });

  return (
    <AnimatedFlashList
      ref={listRef}
      data={bookings}
      onScroll={handleScroll}
      decelerationRate="fast"
      scrollEventThrottle={16}
      snapToInterval={itemFullSize}
      keyExtractor={(booking) => (booking as BookingType)?._id}
      ItemSeparatorComponent={() => <View style={{ height: spacing }}></View>}
      contentContainerStyle={[
        styles.listContainer,
        { paddingVertical: (safeHeight - itemFullSize) / 2 },
      ]}
      renderItem={({ item, index }) => {
        const booking = item as BookingType;
        const status =
          booking?.status === BookingStatusEnum.CONFIRMED
            ? BookingStatusEnum.IN_PROGRESS
            : BookingStatusEnum.COMPLETED;

        return (
          <AnimatedQueueCard
            index={index}
            scrollY={scrollY}
            booking={booking}
            onConfirm={() => onConfirm(booking?._id, status)}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create(({ space }) => ({
  listContainer: {
    paddingInline: space(2),
  },
}));
