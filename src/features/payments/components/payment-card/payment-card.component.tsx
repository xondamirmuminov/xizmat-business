import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import * as Clipboard from "expo-clipboard";
import { cloneElement } from "react";
import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { toast } from "sonner-native";

import { PaymentType, PaymentStatusEnum } from "@/types";
import { CopyIcon } from "@/assets";
import { formatPrice } from "@/lib/helpers";
import { Chip, Flex, Typography } from "@/components";
import type { TypographyColorEnum } from "@/components/typography/types/typography-props.type";

import { PAYMENT_STATUS_CHIP } from "../../constants";

type Props = {
  payment: PaymentType;
  dayjsLocale: string;
  variant?: "default" | "spotlight";
};

function monthTitle(monthYyyyMm: string, locale: string) {
  const base = dayjs(`${monthYyyyMm}-01`).locale(locale);
  if (!base.isValid()) return monthYyyyMm;
  return base.format("MMMM");
}

function periodEndDate(monthYyyyMm: string, locale: string) {
  const base = dayjs(`${monthYyyyMm}-01`).locale(locale);
  if (!base.isValid()) return "";
  return base.endOf("month").format("DD/MM/YYYY");
}

function amountAccent(status: PaymentStatusEnum): TypographyColorEnum {
  switch (status) {
    case PaymentStatusEnum.PAID:
      return "success";
    case PaymentStatusEnum.OVERDUE:
      return "error";
    case PaymentStatusEnum.PENDING:
    case PaymentStatusEnum.PARTIALLY_PAID:
      return "warning";
    default:
      return "textPrimary";
  }
}

const CHIP_ICON_SIZE = 18;

export function PaymentCard({ payment, dayjsLocale, variant = "default" }: Props) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const status = payment.status as PaymentStatusEnum;
  const accent = amountAccent(status);
  const statusMeta = PAYMENT_STATUS_CHIP[status];
  const monthLine = monthTitle(payment.month, dayjsLocale);
  const dateLine = periodEndDate(payment.month, dayjsLocale);
  const statusLabel = t(`payments.status.${payment.status.toLowerCase()}`);
  const rawCode = payment.paymentCode?.trim();
  const code = rawCode ?? t("payments.code_missing");
  const canCopyCode = Boolean(rawCode);

  const statusIcon = statusMeta?.icon
    ? cloneElement(statusMeta.icon, { size: CHIP_ICON_SIZE })
    : undefined;

  const handleCopyCode = async () => {
    if (!rawCode) return;
    try {
      await Clipboard.setStringAsync(rawCode);
      toast.success(t("payments.code_copied"));
    } catch {
      toast.error(t("payments.code_copy_failed"));
    }
  };

  return (
    <View
      style={[
        styles.card,
        variant === "spotlight" ? styles.cardSpotlight : styles.cardDefault,
      ]}
    >
      <Flex direction="row" justifyContent="space-between" alignItems="flex-start">
        <Flex gap={0.5} style={styles.monthCol}>
          <Typography weight="bold" size="text-lg" numberOfLines={1}>
            {monthLine}
          </Typography>
          <Typography size="text-sm" color="secondary" numberOfLines={1}>
            {dateLine}
          </Typography>
        </Flex>
        {statusMeta ? (
          <Chip
            size="sm"
            color={statusMeta.color}
            icon={statusIcon}
            style={styles.statusChip}
          >
            {statusLabel}
          </Chip>
        ) : null}
      </Flex>

      <Flex gap={0.5} style={styles.amountRow}>
        <Typography size="text-xs" color="secondary">
          {t("payments.field_amount")}
        </Typography>
        <Typography weight="semibold" size="text-sm" color={accent}>
          {formatPrice(payment.amount)}
        </Typography>
      </Flex>

      <Flex direction="row" alignItems="center" gap={1} style={styles.codeRow}>
        <Typography size="text-xs" color="secondary">
          {t("payments.field_code")}
        </Typography>
        <Typography
          size="text-xs"
          weight="medium"
          color="textPrimary"
          style={styles.mono}
          selectable={!canCopyCode}
        >
          {code}
        </Typography>
        {canCopyCode ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("payments.copy_code_a11y")}
            hitSlop={10}
            onPress={() => void handleCopyCode()}
            style={({ pressed }) => [
              styles.copyBtn,
              pressed && { opacity: 0.65 },
            ]}
          >
            <CopyIcon size={18} color={theme.colors.textSecondary} />
          </Pressable>
        ) : null}
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  card: {
    borderRadius: 14,
    padding: space(2),
    borderWidth: 1,
    borderColor: colors.slate5,
  },
  cardDefault: {
    backgroundColor: colors.slate1,
  },
  cardSpotlight: {
    backgroundColor: colors.slate2,
  },
  monthCol: {
    flexShrink: 1,
    paddingRight: space(1),
  },
  statusChip: {
    flexShrink: 0,
    maxWidth: "52%",
  },
  amountRow: {
    marginTop: space(2),
  },
  codeRow: {
    marginTop: space(1.5),
    flexWrap: "wrap",
  },
  copyBtn: {
    padding: space(0.25),
    borderRadius: 8,
  },
  mono: {
    fontVariant: ["tabular-nums"],
  },
}));
