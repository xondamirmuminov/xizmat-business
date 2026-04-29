import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { StyleSheet } from "react-native-unistyles";
import { View, ActivityIndicator } from "react-native";
import { useQuery, useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";

import { useAuthStore } from "@/store";
import { Flex, Typography, Button } from "@/components";
import { BusinessFormValuesType } from "@/types";

import { BusinessForm } from "../components/form";
import {
  BUSINESS_FOR_EDIT_QUERY,
  UPDATE_BUSINESS_MUTATION,
} from "../create-business/api";
import {
  mapBusinessToFormValues,
  type BusinessEditFormSource,
  normalizeBusinessFormValuesForUpdate,
} from "../create-business/helpers";

export function EditBusiness() {
  const businessId = useAuthStore((s) => s.businessId);
  const router = useRouter();
  const { t } = useTranslation();

  const { data: editData, error: editQueryError, loading: editQueryLoading } =
    useQuery<{ business: BusinessEditFormSource }>(BUSINESS_FOR_EDIT_QUERY, {
      skip: !businessId,
      variables: { id: businessId! },
    });

  const [updateBusiness, { loading: updateLoading }] = useMutation(
    UPDATE_BUSINESS_MUTATION,
  );

  const editBusiness = editData?.business;

  const defaultValues = useMemo(
    () =>
      editBusiness ? mapBusinessToFormValues(editBusiness) : undefined,
    [editBusiness],
  );

  const handleFinish = (values: BusinessFormValuesType) => {
    if (!businessId) return;

    updateBusiness({
      onError: (e) => {
        toast.error(e.message);
      },
      variables: {
        id: businessId,
        data: normalizeBusinessFormValuesForUpdate(values),
      },
      onCompleted: () => {
        toast.success(t("edit_business.success_message"));
        router.back();
      },
    });
  };

  if (!businessId) {
    return null;
  }

  if (editQueryError) {
    return (
      <Flex
        gap={2}
        alignItems="center"
        justifyContent="center"
        style={styles.loadingScreen}
      >
        <Typography align="center" size="text-sm" color="secondary">
          {t("profile.load_error")}
        </Typography>
        <Button color="secondary" onPress={() => router.back()}>
          {t("create_business.actions.back")}
        </Button>
      </Flex>
    );
  }

  if (editQueryLoading || !editBusiness || !defaultValues) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <BusinessForm
      type="edit"
      key={businessId}
      onFinish={handleFinish}
      loading={updateLoading}
      defaultValues={defaultValues}
    />
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
}));
