import { NetworkStatus } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@apollo/client/react";
import { StyleSheet } from "react-native-unistyles";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store";
import { BookingType, PageInfoType } from "@/types";

import { BUSINESS_BOOKINGS_QUERY } from "./api";
import { BookingHistoryCard } from "./components";

export function BookingsHistory() {
  const { user, businessId } = useAuthStore();

  const { data, refetch, loading, fetchMore, networkStatus } = useQuery<{
    businessBookings: { items: BookingType[]; pageInfo: PageInfoType };
  }>(BUSINESS_BOOKINGS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      limit: 20,
      businessId,
      providerId: user?._id,
    },
  });

  const handleReachListEnd = () => {
    if (pageInfo?.hasNextPage && !refreshing && !loading) {
      fetchMore({
        variables: {
          limit: 20,
          businessId,
          providerId: user?._id,
          page: (pageInfo?.currentPage || 0) + 1,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            fetchMoreResult.businessBookings?.items?.length === 0
          ) {
            return previousResult;
          }

          return {
            businessBookings: {
              pageInfo: fetchMoreResult?.businessBookings?.pageInfo,
              items: previousResult.businessBookings?.items?.concat(
                fetchMoreResult?.businessBookings?.items,
              ),
            },
          };
        },
      });
    }
  };

  const bookings = data?.businessBookings?.items;
  const pageInfo = data?.businessBookings?.pageInfo;
  const refreshing = networkStatus === NetworkStatus.refetch;

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <FlashList
          data={bookings}
          refreshing={refreshing}
          onRefresh={() => refetch()}
          onEndReached={handleReachListEnd}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(booking) => booking?._id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          ListFooterComponent={
            refreshing ? <ActivityIndicator size="small" /> : null
          }
          renderItem={({ item: booking }) => (
            <BookingHistoryCard booking={booking} />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: {
    flex: 1,
  },
  listStyle: {
    paddingBlock: space(3),
    paddingInline: space(2),
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
}));
