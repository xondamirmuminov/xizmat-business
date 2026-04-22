import { StyleSheet } from "react-native-unistyles";

import { Flex, Skeleton } from "@/components";

export function BookingInfoCustomerCardSkeleton() {
  return (
    <Flex gap={1.5} direction="row" alignItems="center">
      <Skeleton style={styles.userAvatar} />
      <Flex flex={1} gap={0.5}>
        <Skeleton width="80%" typographySize="text-md" />
        <Skeleton width="60%" typographySize="text-md" />
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(() => ({
  userAvatar: { width: 56, height: 56, borderRadius: 28 },
}));
