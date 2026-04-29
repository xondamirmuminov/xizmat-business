import { StyleSheet } from "react-native-unistyles";

import { Flex, Skeleton } from "@/components";

export function ProviderProfileUserDetailsCardSkeleton() {
  return (
    <Flex gap={2} direction="row" alignItems="center" style={styles.section}>
      <Skeleton style={[styles.avatar, styles.skeleton]} />
      <Flex flex={1} gap={0.5}>
        <Skeleton
          width="80%"
          style={styles.skeleton}
          typographySize="text-lg"
        />
        <Skeleton
          width={100}
          style={styles.skeleton}
          typographySize="text-sm"
        />
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  skeleton: { backgroundColor: colors.slate5 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 72,
  },
  section: {
    borderWidth: 1,
    borderRadius: 16,
    paddingInline: space(2),
    paddingBlock: space(1.5),
    borderColor: colors.slate4,
    backgroundColor: colors.slate2,
  },
}));
