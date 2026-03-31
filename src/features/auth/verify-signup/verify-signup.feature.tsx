import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";
import { View, Image, Linking } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { UserType } from "@/types";
import { useAuthStore } from "@/store";
import { TelegramIcon, LogoHorizontal } from "@/assets";
import { saveToken, getErrorMessage } from "@/lib/helpers";
import { Flex, Button, OTPInput, Typography } from "@/components";

import { SignUpOutputType } from "../sign-up";
import { CONFIRM_SIGN_UP_MUTATION } from "./api";

type ConfirmSignUpOutputType = {
  confirmSignUp: { token: string; user: UserType };
};

export function VerifySignUp() {
  const { setUser, setToken } = useAuthStore((state) => state);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { code: "" } });

  const code = watch("code") || "";

  const router = useRouter();
  const { t } = useTranslation();
  const { token, telegramBotUrl } = useLocalSearchParams<SignUpOutputType>();

  const [confirmSignUp, { loading }] = useMutation<ConfirmSignUpOutputType>(
    CONFIRM_SIGN_UP_MUTATION,
  );

  const handleVerifyCompleted = async (data: ConfirmSignUpOutputType) => {
    const user = data?.confirmSignUp?.user;
    const token = data?.confirmSignUp?.token;

    setUser(user);
    setToken(token);
    await saveToken(token);
    router.replace("/(tabs)");
    toast.success(t("verify_signup.success_message"));
  };

  const handleVerify = (values: FieldValues) => {
    confirmSignUp({
      onCompleted: handleVerifyCompleted,
      variables: { token, code: values?.code },
    });
  };

  const handleOpenBot = () => {
    if (telegramBotUrl) {
      Linking.openURL(telegramBotUrl);
    }
  };

  const handleGetErrorMessage = getErrorMessage(errors, t);

  const isSubmitButtonDisabled = code?.length < 5;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        bottomOffset={40}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Flex gap={5} alignItems="center">
          <Image style={styles.logo} source={LogoHorizontal} />
          <View style={styles.headerContent}>
            <Typography size="display-sm" weight="semibold">
              {t("verify_signup.title")}
            </Typography>
            <Typography color="secondary">
              {t("verify_signup.description")}
            </Typography>
          </View>
        </Flex>
        <Flex gap={3}>
          <Controller
            name="code"
            control={control}
            rules={{ minLength: 5, maxLength: 5, required: true }}
            render={({ field, fieldState: { error } }) => (
              <Flex gap={1}>
                <OTPInput {...field} autoFocus={false} />
                {error && (
                  <Typography color="error" size="text-xs">
                    {handleGetErrorMessage(field?.name, { max: 5, min: 5 })}
                  </Typography>
                )}
              </Flex>
            )}
          />
          <Button
            variant="ghost"
            onPress={handleOpenBot}
            startIcon={<TelegramIcon />}
          >
            {t("verify_signup.actions.open_telegram")}
          </Button>
          <Flex gap={1}>
            <Typography size="text-xs" color="secondary">
              {t("verify_signup.steps.title")}
            </Typography>
            <Flex gap={1} direction="row" alignItems="center">
              <Flex
                alignItems="center"
                justifyContent="center"
                style={styles.stepNumberWrapper}
              >
                <Typography size="text-xs" weight="medium">
                  1
                </Typography>
              </Flex>
              <Typography color="secondary">
                {t("verify_signup.steps.open")}{" "}
                <Typography
                  weight="semibold"
                  color="textPrimary"
                  onPress={handleOpenBot}
                >
                  @xizmat_bot
                </Typography>
              </Typography>
            </Flex>
            <Flex gap={1} direction="row" alignItems="center">
              <Flex
                alignItems="center"
                justifyContent="center"
                style={styles.stepNumberWrapper}
              >
                <Typography size="text-xs" weight="medium">
                  2
                </Typography>
              </Flex>
              <Typography color="secondary">
                {t("verify_signup.steps.start")}
              </Typography>
            </Flex>
            <Flex gap={1} direction="row" alignItems="center">
              <Flex
                alignItems="center"
                justifyContent="center"
                style={styles.stepNumberWrapper}
              >
                <Typography size="text-xs" weight="medium">
                  3
                </Typography>
              </Flex>
              <Typography color="secondary">
                {t("verify_signup.steps.copy_code")}
              </Typography>
            </Flex>
          </Flex>
          <Button
            size="lg"
            loading={loading}
            disabled={isSubmitButtonDisabled}
            onPress={handleSubmit(handleVerify)}
          >
            {t("verify_signup.actions.verify")}
          </Button>
          <Flex
            gap={0.5}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Typography size="text-sm" color="secondary">
              {t("verify_signup.not_get_code")}
            </Typography>
            <Link href="/sign-up">
              <Typography size="text-sm" color="primary" weight="semibold">
                {t("verify_signup.actions.resend")}
              </Typography>
            </Link>
          </Flex>
        </Flex>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  logo: {
    width: 160,
    height: 60,
    objectFit: "contain",
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContent: {
    width: "100%",
    gap: theme.space(1),
    alignItems: "flex-start",
  },
  container: {
    flexGrow: 1,
    gap: theme.space(4),
    paddingBlock: theme.space(6),
    paddingInline: theme.space(2),
    backgroundColor: theme.colors.background,
  },
  stepNumberWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    width: theme.space(3),
    height: theme.space(3),
    borderColor: theme.colors.slate4,
    backgroundColor: theme.colors.slate1,
  },
}));
