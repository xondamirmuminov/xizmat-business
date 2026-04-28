import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { View, ScrollView } from "react-native";
import { useMemo, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Flex, Typography } from "@/components";
import {
  ClockIcon,
  CalendarIcon,
  HandCoinsIcon,
  CircleQuestionMarkIcon,
} from "@/assets";

import { PAYMENT_PLATFORM_SETTINGS_QUERY } from "./api";
import { HOW_PAYMENTS_DEFAULT_FEE_PERCENT } from "./constants";
import { howPaymentsWorkStyles as styles } from "./how-payments-work.styles";
import {
  StepRow,
  StatusRow,
  SectionHeader,
  RichSecondaryParagraph,
} from "./components";

type PaymentPlatformSettingsQuery = {
  paymentPlatformSettings: {
    bookingPlatformFeePercent: number;
  };
};

export function HowPaymentsWork() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { data, error } = useQuery<PaymentPlatformSettingsQuery>(
    PAYMENT_PLATFORM_SETTINGS_QUERY,
  );

  const feePercent = useMemo(() => {
    const raw = data?.paymentPlatformSettings.bookingPlatformFeePercent;

    if (raw == null || !Number.isFinite(raw)) {
      return HOW_PAYMENTS_DEFAULT_FEE_PERCENT;
    }

    return Math.round(raw * 1000) / 1000;
  }, [data?.paymentPlatformSettings.bookingPlatformFeePercent]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: t("profile.how_payments_title") });
  }, [navigation, t]);

  const feeMain =
    feePercent % 1 === 0 ? String(feePercent) : feePercent.toFixed(2);

  const stepKeys = ["step_1", "step_2", "step_3"] as const;

  const statusLabels = [
    t("profile.how_payments_status_confirmed"),
    t("profile.how_payments_status_in_progress"),
    t("profile.how_payments_status_completed"),
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Flex gap={2}>
          {error ? (
            <View style={styles.errorBanner}>
              <Typography color="error" size="text-sm" weight="medium">
                {t("profile.how_payments_load_error")}
              </Typography>
            </View>
          ) : null}

          <View style={[styles.surfaceCard, styles.surfaceLift]}>
            <SectionHeader
              title={t("profile.how_payments_sec_billing_title")}
              icon={<CalendarIcon size={22} style={styles.headerIcon} />}
            />
            <RichSecondaryParagraph
              style={styles.sectionBody}
              i18nKey="profile.how_payments_sec_billing_body"
            />
          </View>

          <View style={[styles.feeOuter, styles.surfaceLift]}>
            <View style={styles.feeClip}>
              <View style={styles.feeRibbon} />
              <View style={styles.feeInner}>
                <Flex
                  gap={0.75}
                  direction="row"
                  alignItems="center"
                  style={styles.feeBadgeRow}
                >
                  <HandCoinsIcon size={20} style={styles.feeCardIcon} />
                  <Typography
                    size="text-xs"
                    color="primary"
                    weight="semibold"
                    style={styles.feeEyebrow}
                  >
                    {t("profile.how_payments_fee_eyebrow")}
                  </Typography>
                </Flex>

                <Flex
                  gap={0.25}
                  direction="row"
                  alignItems="baseline"
                  style={styles.feeNumberRow}
                >
                  <Typography
                    weight="bold"
                    align="center"
                    color="primary"
                    size="display-lg"
                  >
                    {feeMain}
                  </Typography>
                  <Typography
                    color="primary"
                    size="display-sm"
                    weight="semibold"
                  >
                    %
                  </Typography>
                </Flex>

                <Typography
                  align="center"
                  size="text-sm"
                  weight="medium"
                  color="secondary"
                >
                  {t("profile.how_payments_fee_subtitle")}
                </Typography>

                <View style={styles.formulaPill}>
                  <Typography
                    size="text-xs"
                    color="secondary"
                    weight="semibold"
                    style={styles.formulaCaption}
                  >
                    {t("profile.how_payments_formula_caption")}
                  </Typography>
                  <Typography
                    align="center"
                    size="text-xs"
                    color="secondary"
                    style={styles.formulaLine}
                  >
                    {t("profile.how_payments_formula_line")}
                  </Typography>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.surfaceCard, styles.surfaceLift]}>
            <SectionHeader title={t("profile.how_payments_sec_how_title")} />
            <RichSecondaryParagraph
              style={styles.sectionLead}
              i18nKey="profile.how_payments_sec_how_lead"
            />

            <View style={styles.stepsBlock}>
              {stepKeys.map((key, idx) => (
                <StepRow
                  key={key}
                  index={idx + 1}
                  text={t(`profile.how_payments_${key}`)}
                />
              ))}
            </View>
          </View>

          <View style={[styles.surfaceCard, styles.surfaceLift]}>
            <SectionHeader
              title={t("profile.how_payments_sec_status_title")}
              icon={
                <CircleQuestionMarkIcon size={22} style={styles.headerIcon} />
              }
            />
            <Typography
              size="text-sm"
              color="secondary"
              style={styles.sectionBody}
            >
              {t("profile.how_payments_status_lead")}
            </Typography>

            <View style={styles.statusList}>
              {statusLabels.map((label, i) => (
                <StatusRow
                  label={label}
                  key={`${i}-${label}`}
                  checkIconStyle={styles.statusCheckIcon}
                />
              ))}
            </View>
          </View>

          <View style={[styles.notesWrap, styles.surfaceLift]}>
            <SectionHeader
              title={t("profile.how_payments_sec_notes_title")}
              icon={<ClockIcon size={22} style={styles.headerIcon} />}
            />
            <RichSecondaryParagraph
              style={styles.noteParagraph}
              i18nKey="profile.how_payments_note_trial"
            />
            <RichSecondaryParagraph
              style={styles.noteDivider}
              i18nKey="profile.how_payments_note_deadline"
            />
          </View>
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
}
