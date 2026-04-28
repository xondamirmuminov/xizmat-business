import type { ReactNode } from "react";

import dayjs from "dayjs";
import { toast } from "sonner-native";
import * as Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { CopyIcon } from "@/assets";
import { BusinessType } from "@/types";
import { Flex, Chip, Button, Typography } from "@/components";

type Props = {
  business?: BusinessType;
};

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Flex gap={1.5}>
      <Typography size="text-sm" weight="semibold" color="secondary">
        {title}
      </Typography>
      <Flex gap={2} style={styles.card}>
        {children}
      </Flex>
    </Flex>
  );
}

type BoolVariant = "flag" | "active" | "blocked";

function BoolRow({
  label,
  value,
  variant,
}: {
  label: string;
  value: boolean;
  variant: BoolVariant;
}) {
  const { t } = useTranslation();
  const yes = t("business_details.value_yes");
  const no = t("business_details.value_no");

  let chipColor: "warning" | "success" | "primary" | "secondary" = "secondary";
  if (variant === "blocked") {
    chipColor = value ? "warning" : "success";
  } else if (variant === "active") {
    chipColor = value ? "success" : "secondary";
  } else {
    chipColor = value ? "primary" : "secondary";
  }

  const chip = (
    <Chip size="xs" color={chipColor}>
      {value ? yes : no}
    </Chip>
  );

  return (
    <Flex
      gap={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography size="text-xs" color="secondary" style={styles.labelShrink}>
        {label}
      </Typography>
      {chip}
    </Flex>
  );
}

function TextRow({
  mono,
  label,
  value,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <Flex
      gap={2}
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Typography size="text-xs" color="secondary" style={styles.labelShrink}>
        {label}
      </Typography>
      <Typography
        selectable
        align="right"
        weight="medium"
        style={styles.valueFlex}
        size={mono ? "text-xs" : "text-sm"}
      >
        {value}
      </Typography>
    </Flex>
  );
}

export function ProviderInsightsCard({ business }: Props) {
  const { t } = useTranslation();

  if (!business) {
    return null;
  }

  const formatDt = (iso?: string) =>
    iso ? dayjs(iso).format("DD.MM.YYYY HH:mm") : "—";

  const coords =
    business.coords != null
      ? `${business.coords.latitude}, ${business.coords.longitude}`
      : "—";

  const handleCopyId = async () => {
    try {
      await Clipboard.setStringAsync(business._id);
      toast.success(t("business_details.copied_business_id"));
    } catch {
      toast.error(t("business_details.copy_failed"));
    }
  };

  return (
    <Flex gap={3} style={styles.outer}>
      <Typography size="text-lg" weight="semibold">
        {t("business_details.section_provider_insights")}
      </Typography>

      <SectionCard title={t("business_details.group_status")}>
        <BoolRow
          variant="active"
          value={business.isActive}
          label={t("business_details.row_listing_active")}
        />
        <BoolRow
          variant="flag"
          value={business.isRecommended}
          label={t("business_details.row_recommended")}
        />
        <BoolRow
          variant="flag"
          value={Boolean(business.createdByAdmin)}
          label={t("business_details.row_created_by_admin")}
        />
        <BoolRow
          variant="blocked"
          value={Boolean(business.isBlocked)}
          label={t("business_details.row_account_blocked")}
        />
      </SectionCard>

      <SectionCard title={t("business_details.group_details")}>
        <Flex
          gap={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            size="text-xs"
            color="secondary"
            style={styles.labelShrink}
          >
            {t("business_details.row_business_id")}
          </Typography>
          <Flex
            gap={1}
            direction="row"
            alignItems="center"
            style={styles.idValueRow}
          >
            <Typography
              selectable
              align="right"
              size="text-xs"
              weight="medium"
              numberOfLines={3}
              style={styles.valueFlex}
            >
              {business._id}
            </Typography>
            <Button
              size="sm"
              variant="ghost"
              color="secondary"
              radius="circular"
              startIcon={<CopyIcon />}
              onPress={() => void handleCopyId()}
              accessibilityLabel={t("business_details.copy_business_id")}
            />
          </Flex>
        </Flex>
        <TextRow
          value={formatDt(business.createdAt)}
          label={t("business_details.row_created_at")}
        />
        <TextRow
          value={formatDt(business.updatedAt)}
          label={t("business_details.row_updated_at")}
        />
        <TextRow
          mono
          value={coords}
          label={t("business_details.row_coordinates")}
        />
      </SectionCard>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  valueFlex: {
    flex: 1,
    flexGrow: 1,
    minWidth: 0,
  },
  outer: {
    paddingInline: space(2),
    paddingBottom: space(4),
  },
  labelShrink: {
    flexShrink: 1,
    maxWidth: "48%",
    paddingRight: space(1),
  },
  idValueRow: {
    flex: 1,
    flexGrow: 1,
    minWidth: 0,
    justifyContent: "flex-end",
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: space(2),
    borderColor: colors.slate4,
  },
}));
