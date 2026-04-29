import { View } from "react-native";
import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller, FieldValues } from "react-hook-form";

import { getErrorMessage } from "@/lib/helpers";
import { Flex, Button, PasswordInput } from "@/components";

import { CHANGE_PASSWORD_MUTATION } from "./api";

export function ChangePassword() {
  const { reset, control, handleSubmit } = useForm();

  const { t } = useTranslation();

  const handleChangePasswordCompleted = () => {
    reset({});
    toast.success(t("change_password.success_message"));
  };

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION);

  const handleChangePassword = (values: FieldValues) => {
    changePassword({
      variables: { data: values },
      onCompleted: handleChangePasswordCompleted,
    });
  };

  const handleGetErrorMessage = getErrorMessage(t);

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
        <View style={styles.container}>
          <Flex gap={3}>
            <Flex gap={2.5}>
              <Controller
                control={control}
                name="oldPassword"
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <PasswordInput
                    {...field}
                    required
                    size="lg"
                    error={!!error}
                    textContentType="password"
                    label={t("labels.oldPassword")}
                    autoComplete="current-password"
                    helperText={handleGetErrorMessage(error)}
                    placeholder={t("placeholders.oldPassword")}
                  />
                )}
              />
              <Controller
                control={control}
                name="newPassword"
                rules={{ minLength: 8, required: true }}
                render={({ field, fieldState: { error } }) => (
                  <PasswordInput
                    {...field}
                    required
                    size="lg"
                    error={!!error}
                    autoComplete="password-new"
                    textContentType="newPassword"
                    label={t("labels.newPassword")}
                    placeholder={t("placeholders.newPassword")}
                    helperText={
                      handleGetErrorMessage(error, { min: 8 }) ||
                      t("sign_up.password_requirement")
                    }
                  />
                )}
              />
            </Flex>
            <Button
              size="lg"
              loading={loading}
              color="secondary"
              onPress={handleSubmit(handleChangePassword)}
            >
              {t("change_password.title")}
            </Button>
          </Flex>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingTop: space(3),
    paddingInline: space(2),
    paddingBottom: space(5),
  },
}));
