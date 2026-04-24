import { useState } from "react";
import { View } from "react-native";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";
import { StyleSheet } from "react-native-unistyles";
import { useForm, FormProvider } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { useAuthStore } from "@/store";
import { ChevronLeftIcon } from "@/assets";
import { fragmentRegistry } from "@/graphql";
import { ServiceType, PageInfoType, ServiceFormValuesType } from "@/types";
import {
  Flex,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from "@/components";

import { CREATE_SERVICE_MUTATION } from "./api";
import { SERVICE_FORM_STEPS } from "./constants";
import { normalizeServiceFormValuesForSubmission } from "./helpers";
import { SERVICES_QUERY, SERVICE_CARD_FRAGMENT } from "../services/api";

fragmentRegistry.register(SERVICE_CARD_FRAGMENT);

export function CreateService() {
  const { businessId } = useAuthStore();
  const [step, setStep] = useState(0);

  const formMethods = useForm<ServiceFormValuesType>({
    mode: "onChange",
    defaultValues: { price: 0, hours: 0, minutes: 0 },
  });
  const { trigger, handleSubmit } = formMethods;

  const router = useRouter();
  const { t } = useTranslation();

  const [createService, { loading }] = useMutation<{
    createService: ServiceType;
  }>(CREATE_SERVICE_MUTATION);

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
    toast.success(t("create_service.success_message"));
    router.navigate("/services");
    formMethods.reset({});
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

  const activeStep = SERVICE_FORM_STEPS[step];

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea}>
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
              onPress={handleSubmit(handleFinish)}
            >
              {t("create_service.actions.finish")}
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
}));
