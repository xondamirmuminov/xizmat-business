import { useRef } from "react";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native-unistyles";
import { View, useWindowDimensions } from "react-native";
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

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

type Props = {
  loading?: boolean;
  bookings: BookingType[];
  onCancel: (bookingId: string) => void;
};

export function QueueList({ loading, bookings, onCancel }: Props) {
  const listRef = useRef(null);

  const { height: windowHeight } = useWindowDimensions();
  const safeHeight = windowHeight;

  const scrollY = useSharedValue(0);
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

  // const handleReachListEnd = () => {
  //   if (pageInfo?.hasNextPage && !refreshing && !loading) {
  //     fetchMore({
  //       variables: {
  //         limit: 30,
  //         page: (pageInfo?.currentPage || 0) + 1,
  //       },
  //       updateQuery: (previousResult, { fetchMoreResult }) => {
  //         if (
  //           !fetchMoreResult ||
  //           fetchMoreResult.businessBookings?.items?.length === 0
  //         ) {
  //           return previousResult;
  //         }

  //         return {
  //           businessBookings: {
  //             pageInfo: fetchMoreResult?.businessBookings?.pageInfo,
  //             items: previousResult.businessBookings?.items?.concat(
  //               fetchMoreResult?.businessBookings?.items,
  //             ),
  //           },
  //         };
  //       },
  //     });
  //   }
  // };

  return (
    <AnimatedFlashList
      ref={listRef}
      data={bookings}
      onScroll={handleScroll}
      decelerationRate="fast"
      scrollEventThrottle={16}
      // onEndReachedThreshold={0.4}
      snapToInterval={itemFullSize}
      // onEndReached={handleReachListEnd}
      keyExtractor={(booking) => (booking as BookingType)?._id}
      ListEmptyComponent={loading ? renderSkeleton() : <Empty />}
      ItemSeparatorComponent={() => <View style={{ height: spacing }}></View>}
      contentContainerStyle={[
        styles.listContainer,
        { paddingVertical: (safeHeight - itemFullSize) / 2 },
      ]}
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
    top: -220,
    position: "relative",
    paddingInline: space(2),
  },
}));
