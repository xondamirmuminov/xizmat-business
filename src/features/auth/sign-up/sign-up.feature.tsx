import { useEffect } from "react";
import { View, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { useLazyQuery } from "@apollo/client/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { UserRoleEnum } from "@/types";
import { LogoHorizontal } from "@/assets";
import { getErrorMessage } from "@/lib/helpers";
import { Flex, Input, Button, Typography, PasswordInput } from "@/components";

import { SIGN_UP_QUERY } from "./api";
import { SignUpOutputType } from "./types";

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { t } = useTranslation();

  const [signUp, { data, loading }] = useLazyQuery<{
    signUp: SignUpOutputType;
  }>(SIGN_UP_QUERY);

  const handleSignUp = (values: FieldValues) => {
    signUp({
      variables: { data: { ...values, role: UserRoleEnum.SERVICE_PROVIDER } },
    });
  };

  useEffect(() => {
    if (!loading && data) {
      const payload = data?.signUp;
      router.push({
        params: { ...payload },
        pathname: "/verify-signup",
      });
    }
  }, [data, loading]);

  const handleGetErrorMessage = getErrorMessage(errors, t);

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
              {t("sign_up.title")}
            </Typography>
            <Typography color="secondary">
              {t("sign_up.description")}
            </Typography>
          </View>
        </Flex>
        <Flex gap={3}>
          <Flex gap={2.5}>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  required
                  size="lg"
                  error={!!error}
                  label={t("labels.fullName")}
                  placeholder={t("placeholders.fullName")}
                  helperText={handleGetErrorMessage(field?.name)}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ minLength: 8, required: true }}
              render={({ field, fieldState: { error } }) => (
                <PasswordInput
                  {...field}
                  required
                  size="lg"
                  error={!!error}
                  autoComplete="password-new"
                  label={t("labels.password")}
                  textContentType="newPassword"
                  placeholder={t("placeholders.password")}
                  helperText={
                    handleGetErrorMessage(field?.name, { min: 8 }) ||
                    t("sign_up.password_requirement")
                  }
                />
              )}
            />
          </Flex>
          <Button
            size="lg"
            loading={loading}
            onPress={handleSubmit(handleSignUp)}
          >
            {t("sign_up.actions.create_account")}
          </Button>
        </Flex>
        <Flex
          gap={0.5}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography size="text-sm" color="secondary">
            {t("sign_up.already_have_account")}
          </Typography>
          <Link href="/sign-in">
            <Typography size="text-sm" color="primary" weight="semibold">
              {t("sign_up.actions.log_in")}
            </Typography>
          </Link>
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
