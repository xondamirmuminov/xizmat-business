import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";

import { BusinessFormValuesType } from "@/types";

import { BusinessForm } from "../components/form";
import { CREATE_BUSINESS_MUTATION } from "./api";
import { normalizeBusinessFormValuesForSubmission } from "./helpers";

export function CreateBusiness() {
  const router = useRouter();
  const { t } = useTranslation();

  const [createBusiness, { loading }] = useMutation(CREATE_BUSINESS_MUTATION);

  const handleCreateBusinessCompleted = () => {
    toast.success(t("create_business.success_message"));
    router.navigate("/");
  };

  const handleFinish = (values: BusinessFormValuesType) => {
    const normalizedValues = normalizeBusinessFormValuesForSubmission(values);

    createBusiness({
      variables: { data: normalizedValues },
      onCompleted: handleCreateBusinessCompleted,
    });
  };

  return (
    <BusinessForm type="create" loading={loading} onFinish={handleFinish} />
  );
}
