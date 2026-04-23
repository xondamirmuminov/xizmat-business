import { StyleSheet } from "react-native-unistyles";

import { ClockIcon } from "@/assets";
import { Flex } from "@/components/flex";
import { Skeleton } from "@/components/skeleton";

export function ServiceCardSkeleton() {
  return (
    <Flex style={styles.card}>
      <Flex
        gap={2}
        direction="row"
        alignItems="flex-start"
        style={styles.cardContent}
      >
        <Skeleton style={styles.image} />
        <Flex flex={1} gap={0.5} style={{ overflow: "hidden" }}>
          <Skeleton width={160} typographySize="text-md" />
          <Flex gap={0.5}>
            <Flex gap={0.5} direction="row" alignItems="center">
              <ClockIcon style={styles.infoItemIcon} />
              <Skeleton width={40} typographySize="text-xs" />
            </Flex>
          </Flex>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Skeleton width={100} typographySize="text-md" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  infoItemIcon: {
    width: 14,
    height: 14,
    color: colors.textSecondary,
  },
  cardContent: {
    maxWidth: "100%",
    overflow: "hidden",
    padding: space(1.5),
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    borderColor: colors.slate4,
    backgroundColor: colors.background,
    boxShadow: `${colors.slate3} 0px 4px 12px`,
  },
}));
