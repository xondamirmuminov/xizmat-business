import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import { NetworkStatus } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@apollo/client/react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

import { PaymentType } from "@/types";
import { HandCoinsIcon } from "@/assets";
import { Flex, Typography, Empty } from "@/components";

import { PROVIDER_PAYMENTS_QUERY } from "./api";
import { PaymentCard } from "./components";

export function Payments() {
  const { t, i18n } = useTranslation();

  const dayjsLocale = useMemo(() => {
    if (i18n.language === "uz") return "uz-latn";
    if (i18n.language === "ru") return "ru";
    return "en";
  }, [i18n.language]);

  const { data, loading, error, refetch, networkStatus } = useQuery<{
    payments: PaymentType[];
  }>(PROVIDER_PAYMENTS_QUERY, { notifyOnNetworkStatusChange: true });

  const payments = data?.payments ?? [];
  const refreshing = networkStatus === NetworkStatus.refetch;

  const spotlight = useMemo(() => {
    const currentMonth = dayjs().format("YYYY-MM");
    const previousMonth = dayjs().subtract(1, "month").format("YYYY-MM");
    return (
      payments.find((p) => p.month === currentMonth) ??
      payments.find((p) => p.month === previousMonth) ??
      null
    );
  }, [payments]);

  const historyItems = useMemo(() => {
    if (!spotlight) return payments;
    return payments.filter((p) => p._id !== spotlight._id);
  }, [payments, spotlight]);

  const listHeader = useCallback(() => {
    return (
      <Flex gap={3} style={styles.listHeader}>
        {spotlight ? (
          <Flex gap={1.5}>
            <Typography weight="semibold" size="text-sm" color="secondary">
              {t("payments.section_spotlight")}
            </Typography>
            <PaymentCard
              payment={spotlight}
              dayjsLocale={dayjsLocale}
              variant="spotlight"
            />
          </Flex>
        ) : payments.length > 0 ? (
          <Typography size="text-sm" color="secondary">
            {t("payments.spotlight_empty")}
          </Typography>
        ) : null}
        {historyItems.length > 0 ? (
          <Typography weight="semibold" size="text-sm" color="secondary">
            {t("payments.section_history")}
          </Typography>
        ) : null}
      </Flex>
    );
  }, [spotlight, payments.length, historyItems.length, dayjsLocale, t]);

  const listEmpty = useCallback(() => {
    if (payments.length === 0) {
      return (
        <Empty
          icon={<HandCoinsIcon />}
          title={t("payments.empty_title")}
          description={t("payments.empty_description")}
        />
      );
    }
    return null;
  }, [payments.length, t]);

  if (error) {
    return (
      <View style={styles.screenContainer}>
        <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
          <Flex style={styles.centered}>
            <Typography align="center" color="secondary">
              {t("payments.load_error")}
            </Typography>
          </Flex>
        </SafeAreaView>
      </View>
    );
  }

  if (loading && !data) {
    return (
      <View style={styles.screenContainer}>
        <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
          <Flex style={styles.centered}>
            <ActivityIndicator />
          </Flex>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <FlashList
          data={historyItems}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          refreshing={refreshing}
          onRefresh={() => refetch()}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <PaymentCard payment={item} dayjsLocale={dayjsLocale} />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: { flex: 1 },
  listContent: {
    padding: space(2),
    paddingBottom: space(4),
    flexGrow: 1,
  },
  listHeader: {
    marginBottom: space(2),
    paddingBottom: space(1),
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space(2),
  },
}));
