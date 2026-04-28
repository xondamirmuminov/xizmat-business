import dayjs from "dayjs";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { View, ActivityIndicator } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { useAuthStore } from "@/store";
import { ChevronLeftIcon } from "@/assets";
import { BusinessFormValuesType } from "@/types";
import { DEFAULT_WORKING_DAYS } from "@/lib/constants";
import {
  Flex,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from "@/components";

import { BUSINESS_FORM_STEPS } from "./constants";
import {
  BUSINESS_FOR_EDIT_QUERY,
  CREATE_BUSINESS_MUTATION,
  UPDATE_BUSINESS_MUTATION,
} from "./api";
import {
  mapBusinessToFormValues,
  type BusinessEditFormSource,
  normalizeBusinessFormValuesForUpdate,
  normalizeBusinessFormValuesForSubmission,
} from "./helpers";

export type CreateBusinessProps = {
  variant?: "edit" | "create";
};

export function CreateBusiness({ variant = "create" }: CreateBusinessProps) {
  const [step, setStep] = useState(0);
  const businessId = useAuthStore((s) => s.businessId);

  const formMethods = useForm<BusinessFormValuesType>({
    mode: "onChange",
    defaultValues: {
      workingDays: DEFAULT_WORKING_DAYS,
      workingHours: {
        to: dayjs().set("hour", 19).set("minute", 0),
        from: dayjs().set("hour", 9).set("minute", 0),
      },
    },
  });
  const { reset, trigger, handleSubmit } = formMethods;

  const router = useRouter();
  const { t } = useTranslation();

  const isEdit = variant === "edit";

  const { data: editData, error: editQueryError, loading: editQueryLoading } =
    useQuery<{ business: BusinessEditFormSource }>(BUSINESS_FOR_EDIT_QUERY, {
    skip: !isEdit || !businessId,
    variables: { id: businessId! },
  });

  const [createBusiness, { loading: createLoading }] = useMutation(
    CREATE_BUSINESS_MUTATION,
  );
  const [updateBusiness, { loading: updateLoading }] = useMutation(
    UPDATE_BUSINESS_MUTATION,
  );

  const loading = createLoading || updateLoading;
  const editBusiness = editData?.business;

  useEffect(() => {
    if (!isEdit || !editBusiness) {
      return;
    }
    reset(mapBusinessToFormValues(editBusiness));
  }, [isEdit, editBusiness, reset]);

  const handlePressPrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handlePressNext = async () => {
    const isValid = await trigger(activeStep?.fields);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleCreateBusinessCompleted = () => {
    toast.success(t("create_business.success_message"));
    router.navigate("/");
    formMethods.reset({
      workingDays: DEFAULT_WORKING_DAYS,
      workingHours: {
        to: dayjs().set("hour", 19).set("minute", 0),
        from: dayjs().set("hour", 9).set("minute", 0),
      },
    });
  };

  const handleFinish = (values: BusinessFormValuesType) => {
    if (isEdit && businessId) {
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
      return;
    }

    const normalizedValues = normalizeBusinessFormValuesForSubmission(values);

    createBusiness({
      variables: { data: normalizedValues },
      onCompleted: handleCreateBusinessCompleted,
    });
  };

  const activeStep = BUSINESS_FORM_STEPS[step];

  if (isEdit && !businessId) {
    return null;
  }

  if (isEdit && editQueryError) {
    return (
      <Flex gap={2} alignItems="center" justifyContent="center" style={styles.loadingScreen}>
        <Typography align="center" size="text-sm" color="secondary">
          {t("profile.load_error")}
        </Typography>
        <Button color="secondary" onPress={() => router.back()}>
          {t("create_business.actions.back")}
        </Button>
      </Flex>
    );
  }

  if (isEdit && (editQueryLoading || !editBusiness)) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView
          bottomOffset={40}
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Flex
            gap={2}
            direction="row"
            alignItems="center"
            style={styles.stepsContainer}
            justifyContent="space-between"
          >
            <Flex gap={0.5} flexShrink={1}>
              <Typography size="text-lg" weight="semibold" numberOfLines={1}>
                {t(activeStep?.title)}
              </Typography>
              <Typography size="text-sm" color="secondary" numberOfLines={1}>
                {t("labels.next")}: {t(activeStep?.next)}
              </Typography>
            </Flex>
            <CircularProgress
              size={64}
              textSize={14}
              strokeWidth={6}
              progressPercent={((step + 1) * 100) / BUSINESS_FORM_STEPS?.length}
              text={t("labels.step_count", {
                active: step + 1,
                total: BUSINESS_FORM_STEPS?.length,
              })}
            />
          </Flex>
          <Divider />
          <View style={styles.formContainer}>
            <FormProvider {...formMethods}>{activeStep.component}</FormProvider>
          </View>
        </KeyboardAwareScrollView>
        <Divider space={0} />
        <Flex
          gap={2}
          direction="row"
          justifyContent="space-between"
          style={styles.actionsContainer}
        >
          {step !== 0 && (
            <Button
              fullWidth
              size="lg"
              color="secondary"
              disabled={loading}
              variant="outlined"
              onPress={handlePressPrevious}
              startIcon={<ChevronLeftIcon />}
            >
              {t("create_business.actions.back")}
            </Button>
          )}
          {step !== BUSINESS_FORM_STEPS?.length - 1 ? (
            <Button
              fullWidth
              size="lg"
              color="secondary"
              disabled={loading}
              onPress={handlePressNext}
            >
              {t("create_business.actions.next")}
            </Button>
          ) : (
            <Button
              fullWidth
              size="lg"
              loading={loading}
              color="secondary"
              onPress={handleSubmit(handleFinish)}
            >
              {isEdit
                ? t("edit_business.actions.save")
                : t("create_business.actions.finish")}
            </Button>
          )}
        </Flex>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: { flex: 1 },
  stepsContainer: { paddingInline: space(2) },
  container: {
    paddingBlock: space(1),
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  formContainer: {
    paddingTop: space(1),
    paddingInline: space(2),
    paddingBottom: space(4),
  },
  actionsContainer: {
    paddingTop: space(2),
    paddingBottom: space(1),
    paddingInline: space(2),
  },
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
}));
