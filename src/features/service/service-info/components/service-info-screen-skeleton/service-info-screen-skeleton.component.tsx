import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { Flex, Skeleton } from "@/components";

import { ServiceInfoSection } from "../service-info-section";

function RowValueSkeleton() {
  return (
    <Flex gap={0.5} direction="column">
      <Skeleton width={64} typographySize="text-xs" />
      <Skeleton width="85%" typographySize="text-sm" />
    </Flex>
  );
}

export function ServiceInfoScreenSkeleton() {
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Flex gap={2.5} style={styles.body}>
        <ServiceInfoSection title={t("service_info.section_status")}>
          <Flex gap={1} direction="row" flexWrap="wrap" alignItems="center">
            <Skeleton
              width={88}
              height={24}
              radius="rounded"
              style={styles.chip}
            />
            <Skeleton
              width={104}
              height={24}
              radius="rounded"
              style={styles.chip}
            />
          </Flex>
        </ServiceInfoSection>

        <ServiceInfoSection title={t("service_info.section_pricing")}>
          <Flex gap={1.5}>
            <RowValueSkeleton />
            <RowValueSkeleton />
          </Flex>
        </ServiceInfoSection>

        <ServiceInfoSection title={t("service_info.section_titles")}>
          <Flex gap={1.5}>
            <RowValueSkeleton />
            <RowValueSkeleton />
            <RowValueSkeleton />
          </Flex>
        </ServiceInfoSection>

        <ServiceInfoSection title={t("service_info.section_category")}>
          <Flex gap={1}>
            <RowValueSkeleton />
            <Skeleton width="55%" typographySize="text-xs" />
          </Flex>
        </ServiceInfoSection>

        <ServiceInfoSection title={t("service_info.photos")}>
          <Skeleton width="100%" height={120} style={styles.photoBlock} />
        </ServiceInfoSection>

        <ServiceInfoSection title={t("service_info.section_internal")}>
          <Flex gap={1.5}>
            <Flex gap={0.5} direction="column">
              <Skeleton width={72} typographySize="text-xs" />
              <Skeleton width="100%" typographySize="text-xs" />
            </Flex>
            <RowValueSkeleton />
            <RowValueSkeleton />
          </Flex>
        </ServiceInfoSection>
      </Flex>
    </ScrollView>
  );
}

const styles = StyleSheet.create(({ space }) => ({
  scroll: {
    flex: 1,
  },
  chip: {
    borderRadius: 9999,
  },
  photoBlock: {
    borderRadius: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: space(4),
  },
  body: {
    paddingTop: space(2),
    paddingHorizontal: space(2),
  },
}));
