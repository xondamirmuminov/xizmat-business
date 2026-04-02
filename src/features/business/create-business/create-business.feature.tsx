import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useForm, FormProvider } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronLeftIcon } from "@/assets";
import { DEFAULT_WORKING_DAYS } from "@/lib/constants";
import {
  Flex,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from "@/components";

import { BUSINESS_FORM_STEPS } from "./constants";

export function CreateBusiness() {
  const [step, setStep] = useState(0);

  const formMethods = useForm({
    defaultValues: {
      workingDays: DEFAULT_WORKING_DAYS,
      workingHours: {
        to: dayjs().set("hour", 19).set("minute", 0),
        from: dayjs().set("hour", 9).set("minute", 0),
      },
    },
  });

  const { t } = useTranslation();

  const activeStep = BUSINESS_FORM_STEPS[step];

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Flex
            direction="row"
            alignItems="center"
            style={styles.stepsContainer}
            justifyContent="space-between"
          >
            <Flex gap={0.5}>
              <Typography size="text-lg" weight="semibold">
                {t(activeStep?.title)}
              </Typography>
              <Typography size="text-sm" color="secondary">
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
        </ScrollView>
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
              variant="outlined"
              startIcon={<ChevronLeftIcon />}
              onPress={() => setStep((prev) => prev - 1)}
            >
              {t("create_business.actions.back")}
            </Button>
          )}
          {step !== BUSINESS_FORM_STEPS?.length - 1 ? (
            <Button
              fullWidth
              size="lg"
              color="secondary"
              onPress={() => setStep((prev) => prev + 1)}
            >
              {t("create_business.actions.next")}
            </Button>
          ) : (
            <Button fullWidth size="lg" color="secondary">
              {t("create_business.actions.finish")}
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
