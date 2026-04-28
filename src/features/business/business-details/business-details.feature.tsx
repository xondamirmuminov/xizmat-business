import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { NetworkStatus } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useRef, useMemo, useState } from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { useQuery, useMutation, useApolloClient } from "@apollo/client/react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  View,
  Share,
  Alert,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { useAuthStore } from "@/store";
import { BusinessType, LocalizedTextType } from "@/types";
import {
  Flex,
  Tabs,
  Button,
  Typography,
  DropdownMenu,
} from "@/components";
import {
  ShareIcon,
  TrashIcon,
  SquarePenIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
} from "@/assets";

import { BUSINESS_DETAILS_QUERY } from "./api/queries";
import { DELETE_BUSINESS_MUTATION } from "./api/mutations";
import { GalleryPanel } from "./components/gallery-panel/gallery-panel.component";
import { WorkingHoursPanel } from "./components/working-hours-panel/working-hours-panel.component";
import { ProviderInsightsCard } from "./components/provider-insights-card/provider-insights-card.component";
import { CustomerPreviewHeader } from "./components/customer-preview-header/customer-preview-header.component";

const LANGUAGE_CODES = new Set(["en", "uz", "ru"]);

const HEADER_SCROLL_THRESHOLD = 56;

export function BusinessDetails() {
  const { t, i18n } = useTranslation();
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const isDeleting = useRef(false);

  const businessId = useAuthStore((s) => s.businessId);
  const setBusinessId = useAuthStore((s) => s.setBusinessId);
  const [activeTab, setActiveTab] = useState("gallery");
  const [headerElevated, setHeaderElevated] = useState(false);

  const rawLang = (i18n.language ?? "en").split("-")[0] ?? "en";
  const locale = (
    LANGUAGE_CODES.has(rawLang) ? rawLang : "en"
  ) as keyof LocalizedTextType;

  const { data, error, loading, refetch, networkStatus } = useQuery<{
    business: BusinessType;
  }>(BUSINESS_DETAILS_QUERY, {
    skip: !businessId,
    variables: { id: businessId! },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteBusiness, { loading: deleteLoading }] = useMutation(
    DELETE_BUSINESS_MUTATION,
  );

  const business = data?.business;
  const refreshing = networkStatus === NetworkStatus.refetch;

  const tabItems = useMemo(
    () => [
      { key: "gallery", label: t("business_details.gallery") },
      { key: "workingHours", label: t("business_details.working_hours") },
      {
        key: "providerInsights",
        label: t("business_details.tab_provider_insights"),
      },
    ],
    [t],
  );

  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    const phones = business?.phoneNumbers?.length
      ? business.phoneNumbers.join(", ")
      : "—";
    const message = `
${business?.name}
${t("labels.phone")}: ${phones}
${t("labels.address")}: ${business?.address ?? "—"}`;

    try {
      await Share.share({
        message,
        url: `https://xizmat-app.uz/provider/${business?._id}`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg);
    }
  };

  const handleEdit = () => {
    (router as { push: (p: string) => void }).push("/edit-business");
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    setHeaderElevated(y > HEADER_SCROLL_THRESHOLD);
  };

  const handleDelete = () => {
    if (!businessId || isDeleting.current || deleteLoading) {
      return;
    }
    Alert.alert(
      t("business_details.delete_title"),
      t("business_details.delete_message"),
      [
        { style: "cancel", text: t("service_info.delete_cancel") },
        {
          style: "destructive",
          text: t("service_info.delete_confirm"),
          onPress: () => {
            isDeleting.current = true;
            deleteBusiness({
              variables: { id: businessId },
              onError: (e) => {
                toast.error(e.message);
                isDeleting.current = false;
              },
              onCompleted: () => {
                apolloClient.cache.evict({
                  id: apolloClient.cache.identify({
                    _id: businessId,
                    __typename: "Business",
                  }),
                });
                apolloClient.cache.gc();
                setBusinessId(null);
                toast.success(t("business_details.delete_success"));
                router.replace("/");
                isDeleting.current = false;
              },
            });
          },
        },
      ],
    );
  };

  const renderTab = () => {
    switch (activeTab) {
      case "gallery":
        return <GalleryPanel images={business?.images ?? []} />;
      case "workingHours":
        return (
          <WorkingHoursPanel
            workingDays={business?.workingDays}
            workingHours={business?.workingHours}
          />
        );
      case "providerInsights":
        return <ProviderInsightsCard business={business} />;
      default:
        return null;
    }
  };

  if (!businessId) {
    return null;
  }

  if (loading && !business) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <Flex gap={2} style={styles.centered}>
          <Typography align="center" size="text-sm" color="secondary">
            {t("profile.load_error")}
          </Typography>
          <Button color="secondary" onPress={() => void refetch()}>
            {t("businesses_list.retry")}
          </Button>
        </Flex>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["bottom", "left", "right"]}>
      <View style={styles.screenWrap}>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => void refetch()}
              tintColor={theme.colors.primary10}
            />
          }
        >
          <Flex gap={4}>
            <CustomerPreviewHeader locale={locale} business={business} />
            <Flex gap={2} style={styles.tabsSection}>
              <Tabs
                items={tabItems}
                activeTab={activeTab}
                containerStyle={styles.tabsContainer}
                onTabPress={(key) => {
                  setActiveTab(key);
                }}
              />
              {renderTab()}
            </Flex>
          </Flex>
        </ScrollView>

        <View pointerEvents="box-none" style={styles.headerOverlay}>
          <View
            style={[
              headerElevated
                ? {
                    borderBottomWidth: 1,
                    paddingBottom: theme.space(1),
                    borderBottomColor: theme.colors.slate4,
                    backgroundColor: theme.colors.background,
                  }
                : null,
            ]}
          >
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={[
                styles.headerActionsRow,
                { paddingTop: insets.top + 4 },
              ]}
            >
            <Button
              variant="ghost"
              color="secondary"
              radius="circular"
              onPress={handleBack}
              startIcon={<ChevronLeftIcon />}
            />
            <Flex gap={1} direction="row" alignItems="center">
              <Button
                variant="ghost"
                color="secondary"
                radius="circular"
                startIcon={<ShareIcon />}
                onPress={() => void handleShare()}
              />
              <DropdownMenu
                anchorAccessibilityLabel={t("service_info.more_actions")}
                trigger={
                  <Button
                    variant="ghost"
                    color="secondary"
                    radius="circular"
                    startIcon={<EllipsisVerticalIcon />}
                  />
                }
                items={[
                  {
                    key: "edit",
                    onPress: handleEdit,
                    icon: <SquarePenIcon />,
                    label: t("service_info.edit"),
                  },
                  {
                    key: "delete",
                    destructive: true,
                    icon: <TrashIcon />,
                    onPress: handleDelete,
                    disabled: deleteLoading,
                    label: t("service_info.delete"),
                  },
                ]}
              />
            </Flex>
          </Flex>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  tabsSection: {
    paddingTop: space(1),
  },
  tabsContainer: {
    paddingInline: space(2),
  },
  headerActionsRow: {
    paddingInline: space(2),
  },
  screenWrap: {
    flex: 1,
    position: "relative",
  },
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerOverlay: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    position: "absolute",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: space(2),
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    padding: space(4),
    alignItems: "center",
    justifyContent: "center",
  },
}));
