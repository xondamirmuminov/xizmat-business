import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";

import { WEEK_DAYS } from "@/lib/constants";
import { Flex, Divider, Typography } from "@/components";

type Props = {
  workingDays?: string[];
  workingHours?: { to: number; from: number };
};

export function WorkingHoursPanel({
  workingHours,
  workingDays = [],
}: Props) {
  const { t } = useTranslation();

  const hasHours =
    workingHours != null &&
    workingHours.from != null &&
    workingHours.to != null;

  return (
    <Flex gap={2} style={styles.paddingContainer}>
      <Typography size="text-lg" weight="semibold">
        {t("business_details.working_hours")}
      </Typography>
      <Flex style={styles.cardContainer}>
        {WEEK_DAYS.map((weekDay) => {
          const isClosed = !workingDays?.includes(weekDay);
          const isToday =
            dayjs().locale("en").format("dddd")?.toLowerCase() === weekDay;
          const from = hasHours
            ? dayjs()
                .hour(workingHours.from)
                .minute(0)
                .millisecond(0)
                .format("HH:mm")
            : "--:--";
          const to = hasHours
            ? dayjs()
                .hour(workingHours.to)
                .minute(0)
                .millisecond(0)
                .format("HH:mm")
            : "--:--";

          const todayTimeColor = isToday ? "primary" : "textPrimary";

          return (
            <Flex key={weekDay}>
              <Flex
                gap={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                style={[styles.card, isToday ? styles.todayCard : null]}
              >
                <Typography color={isToday ? "primary" : "textPrimary"}>
                  {t(`date.week_days.${weekDay}`)}
                </Typography>
                <Typography
                  weight="medium"
                  color={isClosed ? "error" : todayTimeColor}
                >
                  {isClosed ? t("labels.closed") : `${from} - ${to}`}
                </Typography>
              </Flex>
              <Divider space={0} />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  todayCard: { backgroundColor: colors.primary2 },
  paddingContainer: {
    paddingInline: space(2),
  },
  card: { paddingBlock: space(2), paddingInline: space(2) },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.slate4,
  },
}));
