import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
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
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Flex gap={2.5} style={styles.body}>
        <ServiceInfoSection title={t("service_info.section_status")}>
          <Flex gap={1} direction="row" alignItems="center" flexWrap="wrap">
            <Skeleton
              style={styles.chip}
              width={88}
              height={24}
              radius="rounded"
            />
            <Skeleton
              style={styles.chip}
              width={104}
              height={24}
              radius="rounded"
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
          <Skeleton style={styles.photoBlock} width="100%" height={120} />
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: space(4),
  },
  body: {
    paddingHorizontal: space(2),
    paddingTop: space(2),
  },
  chip: {
    borderRadius: 9999,
  },
  photoBlock: {
    borderRadius: 10,
  },
}));
