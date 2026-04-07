import { useEffect } from "react";
import { toast } from "sonner-native";
import { View, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { useLazyQuery } from "@apollo/client/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { LogoHorizontal } from "@/assets";
import { Flex, Button, Typography, PhoneInput } from "@/components";
import { getErrorMessage, formatPhoneNumberForSubmit } from "@/lib/helpers";

import { FORGOT_PASSWORD_QUERY } from "./api";

export function ForgotPassword() {
  const { control, handleSubmit } = useForm();

  const { t } = useTranslation();

  const [forgotPassword, { data, loading }] = useLazyQuery(
    FORGOT_PASSWORD_QUERY,
  );

  const handleSendCode = (values: FieldValues) => {
    const phone = formatPhoneNumberForSubmit(values?.phone);

    forgotPassword({ variables: { data: { phone } } });
  };

  useEffect(() => {
    if (!loading && data) {
      toast.success(t("forgot_password.success_message"));
    }
  }, [data, loading]);

  const handleGetErrorMessage = getErrorMessage(t);

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
              {t("forgot_password.title")}
            </Typography>
            <Typography color="secondary">
              {t("forgot_password.description")}
            </Typography>
          </View>
        </Flex>
        <Flex gap={3}>
          <Controller
            name="phone"
            control={control}
            rules={{ minLength: 9, maxLength: 9, required: true }}
            render={({ field, fieldState: { error } }) => (
              <PhoneInput
                {...field}
                required
                size="lg"
                error={!!error}
                label={t("labels.phone")}
                placeholder={t("placeholders.phone")}
                helperText={handleGetErrorMessage(error, {
                  min: 9,
                  max: 9,
                })}
              />
            )}
          />
          <Button
            size="lg"
            loading={loading}
            onPress={handleSubmit(handleSendCode)}
          >
            {t("forgot_password.actions.send_code")}
          </Button>
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
}));
