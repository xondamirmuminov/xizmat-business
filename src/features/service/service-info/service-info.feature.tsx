import dayjs from "dayjs";
import { useRef } from "react";
import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Alert, ScrollView, RefreshControl } from "react-native";
import { useQuery, useMutation, useApolloClient } from "@apollo/client/react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useAuthStore } from "@/store";
import { formatPrice } from "@/lib/helpers";
import { ServiceType, LocalizedTextType } from "@/types";
import { Flex, Chip, Button, Typography, DropdownMenu } from "@/components";
import {
  TrashIcon,
  SquarePenIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
} from "@/assets";

import { SERVICE_QUERY, DELETE_SERVICE_MUTATION } from "./api";
import {
  evictServiceFromListCache,
  buildServiceImageSlideUris,
} from "./helpers";
import {
  ServiceInfoRow,
  ServiceInfoSection,
  ServiceInfoMediaRow,
  ServiceInfoScreenSkeleton,
} from "./components";

function formatDate(iso: string | undefined) {
  if (!iso) return "—";
  return dayjs(iso).format("MMM D, YYYY · HH:mm");
}

export function ServiceInfo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isDeleting = useRef(false);

  const apollo = useApolloClient();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const locale = i18n.language as keyof LocalizedTextType;
  const { businessId } = useAuthStore();

  const { data, error, loading, refetch, networkStatus } = useQuery<{
    service: ServiceType;
  }>(SERVICE_QUERY, {
    skip: !id,
    notifyOnNetworkStatusChange: true,
    variables: {
      serviceId: id,
    },
  });

  const [deleteService, { loading: deleteLoading }] = useMutation(
    DELETE_SERVICE_MUTATION,
  );

  const service = data?.service;
  const refreshing = networkStatus === 4;

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    if (!id) return;
    (router as { push: (p: string) => void }).push(`/services/${id}/edit`);
  };

  const handleDelete = () => {
    if (!id || isDeleting.current || deleteLoading) return;
    Alert.alert(
      t("service_info.delete_title"),
      t("service_info.delete_message"),
      [
        { style: "cancel", text: t("service_info.delete_cancel") },
        {
          style: "destructive",
          text: t("service_info.delete_confirm"),
          onPress: () => {
            isDeleting.current = true;
            deleteService({
              variables: { id },
              onError: (e) => {
                toast.error(e.message);
                isDeleting.current = false;
              },
              onCompleted: () => {
                if (businessId) {
                  evictServiceFromListCache(apollo.cache, businessId, id);
                }
                toast.success(t("service_info.delete_success"));
                router.replace("/services");
                isDeleting.current = false;
              },
            });
          },
        },
      ],
    );
  };

  const titleLine = service?.title?.[locale] || t("service_info.screen_title");

  const imageUris = service
    ? buildServiceImageSlideUris(service.primaryImage, service.images)
    : [];

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["right", "left"]}>
        <View style={[styles.topBar, { paddingTop: insets.top }]}>
          <Flex
            gap={1.5}
            direction="row"
            alignItems="center"
            style={styles.topBarRow}
          >
            <Button
              variant="ghost"
              color="secondary"
              radius="circular"
              onPress={handleBack}
              startIcon={<ChevronLeftIcon />}
            />
            <Flex flex={1} style={styles.topTitleWrap}>
              <Typography size="text-md" weight="semibold" numberOfLines={1}>
                {loading && !service
                  ? t("service_info.screen_title")
                  : titleLine}
              </Typography>
            </Flex>
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
        </View>

        {error && !loading ? (
          <Flex gap={2} style={styles.centered}>
            <Typography
              size="text-sm"
              color="secondary"
              style={styles.centerText}
            >
              {t("service_info.load_error")}
            </Typography>
            <Button
              color="secondary"
              variant="outlined"
              onPress={() => void refetch()}
            >
              {t("businesses_list.retry")}
            </Button>
          </Flex>
        ) : loading && !service ? (
          <ServiceInfoScreenSkeleton />
        ) : (
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  void refetch();
                }}
              />
            }
          >
            <Flex gap={2.5} style={styles.body}>
              <ServiceInfoSection title={t("service_info.section_status")}>
                <Flex
                  gap={1}
                  direction="row"
                  flexWrap="wrap"
                  alignItems="center"
                >
                  <Chip
                    size="xs"
                    color={service?.isActive ? "success" : "warning"}
                  >
                    {service?.isActive
                      ? t("service_info.status_active")
                      : t("service_info.status_inactive")}
                  </Chip>
                  {service?.isRecommended ? (
                    <Chip size="xs" color="info">
                      {t("status.recommended")}
                    </Chip>
                  ) : null}
                </Flex>
              </ServiceInfoSection>

              <ServiceInfoSection title={t("service_info.section_pricing")}>
                <Flex gap={1.5}>
                  <ServiceInfoRow
                    label={t("labels.price")}
                    value={formatPrice(service?.price ?? 0)}
                  />
                  <ServiceInfoRow
                    label={t("labels.duration")}
                    value={t("service_info.duration_minutes", {
                      count: service?.durationMinutes ?? 0,
                    })}
                  />
                </Flex>
              </ServiceInfoSection>

              <ServiceInfoSection title={t("service_info.section_titles")}>
                <Flex gap={1.5}>
                  <ServiceInfoRow
                    label="EN"
                    value={service?.title?.en ?? "—"}
                  />
                  <ServiceInfoRow
                    label="UZ"
                    value={service?.title?.uz ?? "—"}
                  />
                  <ServiceInfoRow
                    label="RU"
                    value={service?.title?.ru ?? "—"}
                  />
                </Flex>
              </ServiceInfoSection>

              <ServiceInfoSection title={t("service_info.section_category")}>
                <Flex gap={1}>
                  <ServiceInfoRow
                    label={t("service_info.label_category_name")}
                    value={service?.category?.title?.[locale] ?? "—"}
                  />
                  {service?.categoryId ? (
                    <Typography size="text-xs" color="secondary">
                      {t("service_info.label_category_id")}:{" "}
                      {service.categoryId}
                    </Typography>
                  ) : null}
                </Flex>
              </ServiceInfoSection>

              <ServiceInfoSection title={t("service_info.photos")}>
                {imageUris.length > 0 ? (
                  <ServiceInfoMediaRow
                    images={service?.images}
                    primaryImage={service?.primaryImage}
                  />
                ) : (
                  <Typography size="text-sm" color="secondary">
                    {t("service_info.photos_empty")}
                  </Typography>
                )}
              </ServiceInfoSection>

              <ServiceInfoSection title={t("service_info.section_internal")}>
                <Flex gap={1.5}>
                  <Flex gap={0.5} direction="column">
                    <Typography size="text-xs" color="secondary">
                      {t("service_info.label_service_id")}
                    </Typography>
                    <Typography size="text-xs" color="textPrimary">
                      {service?._id ?? "—"}
                    </Typography>
                  </Flex>
                  <ServiceInfoRow
                    value={formatDate(service?.createdAt)}
                    label={t("service_info.label_created")}
                  />
                  <ServiceInfoRow
                    value={formatDate(service?.updatedAt)}
                    label={t("service_info.label_updated")}
                  />
                </Flex>
              </ServiceInfoSection>
            </Flex>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  scroll: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topBarRow: {
    minHeight: 44,
  },
  topTitleWrap: {
    minWidth: 0,
  },
  centerText: {
    textAlign: "center",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: space(4),
  },
  body: {
    paddingTop: space(2),
    paddingHorizontal: space(2),
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    padding: space(3),
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    borderBottomWidth: 1,
    paddingBottom: space(1.5),
    paddingHorizontal: space(2),
    borderBottomColor: colors.slate4,
    backgroundColor: colors.background,
  },
}));
