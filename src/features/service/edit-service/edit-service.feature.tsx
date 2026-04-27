import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";
import { useRef, useMemo, useEffect } from "react";
import { StyleSheet } from "react-native-unistyles";
import { View, ActivityIndicator } from "react-native";
import { useQuery, useMutation } from "@apollo/client/react";
import { useRouter, useLocalSearchParams } from "expo-router";

import { useAuthStore } from "@/store";
import { fragmentRegistry } from "@/graphql";
import { Flex, Typography } from "@/components";
import {
  ServiceType,
  PageInfoType,
  ServiceImageSnapshot,
  ServiceFormValuesType,
} from "@/types";

import { ServiceForm } from "../components";
import { SERVICE_QUERY } from "../service-info/api";
import { SERVICES_QUERY, SERVICE_CARD_FRAGMENT } from "../services/api";
import { UPDATE_SERVICE_MUTATION } from "../service-info/api/mutations";
import { normalizeServiceFormValuesForUpdate } from "../components/form/helpers";
import {
  mapServiceToFormValues,
  imageSnapshotFromService,
} from "./map-service-to-form";

fragmentRegistry.register(SERVICE_CARD_FRAGMENT);

export function EditService() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { businessId } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();
  const imageSnapshotRef = useRef<null | ServiceImageSnapshot>(null);

  const { data, loading: queryLoading } = useQuery<{
    service: ServiceType;
  }>(SERVICE_QUERY, {
    skip: !id,
    variables: { serviceId: id },
  });

  const [updateService, { loading: mutationLoading }] = useMutation<{
    updateService: ServiceType;
  }>(UPDATE_SERVICE_MUTATION);

  const service = data?.service;

  useEffect(() => {
    if (service) {
      imageSnapshotRef.current = imageSnapshotFromService(service);
    }
  }, [service]);

  const defaultValues = useMemo(
    () => (service ? mapServiceToFormValues(service) : undefined),
    [service],
  );

  const handleFinish = (values: ServiceFormValuesType) => {
    if (!id || !imageSnapshotRef.current) return;
    const updatePayload = normalizeServiceFormValuesForUpdate(
      values,
      imageSnapshotRef.current,
    );

    updateService({
      variables: { id, data: updatePayload },
      onError: (e) => toast.error(e.message),
      onCompleted: () => {
        toast.success(t("service_info.update_success"));
        router.replace("/services");
      },
      update: (cache, { data: mutData }) => {
        const updated = mutData?.updateService;
        if (!updated || !businessId) return;
        const existing = cache.readQuery<{
          services: { items: ServiceType[]; pageInfo: PageInfoType };
        }>({ query: SERVICES_QUERY, variables: { limit: 30, businessId } });
        if (!existing?.services?.items) return;
        const items = existing.services.items.map((s) =>
          s._id === updated._id ? { ...s, ...updated } : s,
        );
        cache.writeQuery({
          query: SERVICES_QUERY,
          variables: { limit: 30, businessId },
          data: { ...existing, services: { ...existing.services, items } },
        });
      },
    });
  };

  if (queryLoading && !data) {
    return (
      <View style={styles.centered}>
        <Flex gap={2} alignItems="center" justifyContent="center">
          <ActivityIndicator size="large" />
        </Flex>
      </View>
    );
  }

  if (!service || !defaultValues) {
    return (
      <View style={styles.centered}>
        <Typography>{t("service_info.load_error")}</Typography>
      </View>
    );
  }

  return (
    <ServiceForm
      type="edit"
      key={service._id}
      onFinish={handleFinish}
      loading={mutationLoading}
      defaultValues={defaultValues}
    />
  );
}

const styles = StyleSheet.create(() => ({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
}));
