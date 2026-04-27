import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { View, Alert, BackHandler } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { ChevronLeftIcon } from "@/assets";
import { ServiceFormValuesType } from "@/types";
import {
  Flex,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from "@/components";

import { SERVICE_FORM_STEPS } from "./constants";

const EMPTY_TITLE = { en: "", uz: "", ru: "" };

const baseFormDefaults: ServiceFormValuesType = {
  price: 0,
  hours: 0,
  minutes: 0,
  categoryId: "",
  durationMinutes: 0,
  title: { ...EMPTY_TITLE },
};

type Props = {
  loading?: boolean;
  type: "edit" | "create";
  defaultValues?: ServiceFormValuesType;
  onFinish: (values: ServiceFormValuesType) => void;
};

export function ServiceForm({ type, loading, onFinish, defaultValues }: Props) {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { t } = useTranslation();

  const formMethods = useForm<ServiceFormValuesType>({
    mode: "onChange",
    defaultValues: defaultValues
      ? {
          ...baseFormDefaults,
          ...defaultValues,
          title: defaultValues.title || { ...EMPTY_TITLE },
        }
      : baseFormDefaults,
  });
  const { trigger, formState, handleSubmit } = formMethods;
  const { isDirty } = formState;

  const confirmLeaveEdit = useCallback(() => {
    Alert.alert(
      t("service_info.unsaved_title"),
      t("service_info.unsaved_message"),
      [
        { style: "cancel", text: t("service_info.unsaved_stay") },
        {
          style: "destructive",
          onPress: () => router.back(),
          text: t("service_info.unsaved_leave"),
        },
      ],
    );
  }, [router, t]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (type === "edit" && isDirty) {
        confirmLeaveEdit();
        return true;
      }
      if (type === "edit" && !isDirty) {
        router.back();
        return true;
      }
      if (type === "create" && step > 0) {
        setStep((s) => s - 1);
        return true;
      }
      if (type === "create") {
        router.back();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [confirmLeaveEdit, isDirty, router, type, step]);

  const handleHeaderBack = () => {
    if (type === "edit" && isDirty) {
      confirmLeaveEdit();
      return;
    }
    router.back();
  };

  const handlePressPrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handlePressNext = async () => {
    const isValid = await trigger(activeStep?.fields);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleFinish = (values: ServiceFormValuesType) => {
    if (type === "edit" && !isDirty) return;
    onFinish(values);
  };

  const activeStep = SERVICE_FORM_STEPS[step];
  const isLast = step === SERVICE_FORM_STEPS?.length - 1;
  const saveDisabled = loading || (type === "edit" && isLast && !isDirty);

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView
        style={styles.safeArea}
        edges={["right", "left", "top", "bottom"]}
      >
        <KeyboardAwareScrollView
          bottomOffset={40}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Flex
            gap={2}
            direction="row"
            alignItems="center"
            style={styles.stepsContainer}
          >
            <Button
              variant="ghost"
              color="secondary"
              radius="circular"
              onPress={handleHeaderBack}
              startIcon={<ChevronLeftIcon />}
            />
            <Flex gap={0.5} flex={1} flexShrink={1} style={{ minWidth: 0 }}>
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
              progressPercent={((step + 1) * 100) / SERVICE_FORM_STEPS?.length}
              text={t("labels.step_count", {
                active: step + 1,
                total: SERVICE_FORM_STEPS?.length,
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
              {t("create_service.actions.back")}
            </Button>
          )}
          {step !== SERVICE_FORM_STEPS?.length - 1 ? (
            <Button
              fullWidth
              size="lg"
              color="secondary"
              loading={loading}
              onPress={handlePressNext}
            >
              {t("create_service.actions.next")}
            </Button>
          ) : (
            <Button
              fullWidth
              size="lg"
              color="secondary"
              loading={loading}
              disabled={saveDisabled}
              onPress={handleSubmit(handleFinish)}
            >
              {t(`create_service.actions.${type}`)}
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
    paddingBottom: space(2),
    paddingInline: space(2),
  },
}));
