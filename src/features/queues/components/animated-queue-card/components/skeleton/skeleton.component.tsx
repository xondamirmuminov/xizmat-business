import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { XIcon, PhoneIcon } from "@/assets";
import { Flex, Button, Skeleton } from "@/components";

export function QueueCardSkeleton() {
  return (
    <View style={styles.card}>
      <Flex gap={4} flex={1} justifyContent="space-between">
        <Flex gap={1.5}>
          <Flex
            gap={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex gap={1}>
              <Skeleton width={160} typographySize="text-sm" />
              <Skeleton width={120} typographySize="text-xl" />
            </Flex>
            <Skeleton width={80} height={24} radius="circular" />
          </Flex>
          <Flex gap={2.5}>
            <Flex gap={0.5} style={styles.infoWrapper}>
              <Skeleton width="80%" typographySize="text-sm" />
              <Skeleton width={100} typographySize="text-sm" />
            </Flex>
            <Flex gap={2} style={styles.customerWrapper}>
              <Flex gap={1} direction="row" alignItems="center">
                <Skeleton style={styles.userAvatar} />
                <Flex flex={1} gap={0.5}>
                  <Skeleton width="75%" typographySize="text-md" />
                  <Skeleton width={80} typographySize="text-sm" />
                </Flex>
              </Flex>
              <Flex gap={1} direction="row">
                <Button
                  disabled
                  fullWidth
                  color="error"
                  variant="ghost"
                  startIcon={<XIcon />}
                >
                  Cancel
                </Button>
                <Button
                  disabled
                  fullWidth
                  variant="ghost"
                  color="secondary"
                  startIcon={<PhoneIcon />}
                >
                  Call
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Skeleton height={60} width="100%" radius="circular" />
      </Flex>
    </View>
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
