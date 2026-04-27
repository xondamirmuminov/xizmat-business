import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";

import { useAuthStore } from "@/store";
import { fragmentRegistry } from "@/graphql";
import { ServiceType, PageInfoType, ServiceFormValuesType } from "@/types";

import { ServiceForm } from "../components";
import { CREATE_SERVICE_MUTATION } from "./api";
import { SERVICES_QUERY, SERVICE_CARD_FRAGMENT } from "../services/api";
import { normalizeServiceFormValuesForSubmission } from "../components/form/helpers";

fragmentRegistry.register(SERVICE_CARD_FRAGMENT);

export function CreateService() {
  const { businessId } = useAuthStore();

  const router = useRouter();
  const { t } = useTranslation();

  const [createService, { loading }] = useMutation<{
    createService: ServiceType;
  }>(CREATE_SERVICE_MUTATION);

  const handleCreateBusinessCompleted = () => {
    toast.success(t("create_service.success_message"));
    router.navigate("/services");
  };

  const handleFinish = (values: ServiceFormValuesType) => {
    const normalizedValues = normalizeServiceFormValuesForSubmission(values);

    createService({
      onCompleted: handleCreateBusinessCompleted,
      variables: { data: { ...normalizedValues, businessId } },
      update: (cache, { data }) => {
        const newService = data?.createService;
        const existingServices = cache.readQuery<{
          services: {
            items: ServiceType[];
            pageInfo: PageInfoType;
          };
        }>({ query: SERVICES_QUERY, variables: { limit: 30, businessId } });

        cache.writeQuery({
          query: SERVICES_QUERY,
          data: {
            services: {
              items: [newService, ...(existingServices?.services?.items || [])],
              pageInfo: {
                ...existingServices?.services?.pageInfo,
                totalItems:
                  (existingServices?.services?.pageInfo?.totalItems || 0) + 1,
              },
            },
          },
        });
      },
    });
  };

  return (
    <ServiceForm type="create" loading={loading} onFinish={handleFinish} />
  );
}
