import { useEffect } from "react";
import { View, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native-unistyles";
import { useLazyQuery } from "@apollo/client/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { UserType } from "@/types";
import { useAuthStore } from "@/store";
import { LogoHorizontal } from "@/assets";
import {
  saveToken,
  getErrorMessage,
  formatPhoneNumberForSubmit,
} from "@/lib/helpers";
import {
  Flex,
  Button,
  Typography,
  PhoneInput,
  PasswordInput,
} from "@/components";

import { SIGN_IN_QUERY } from "./api";

type SignInOutputType = {
  signIn: { token: string; user: UserType };
};

export function SignIn() {
  const { setUser, setToken } = useAuthStore((state) => state);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { t } = useTranslation();

  const [signIn, { data, loading }] =
    useLazyQuery<SignInOutputType>(SIGN_IN_QUERY);

  const handleSignIn = (values: FieldValues) => {
    values.phone = formatPhoneNumberForSubmit(values?.phone);

    signIn({ variables: { data: values } });
  };

  const handleSignInCompleted = async () => {
    const user = data?.signIn?.user;
    const token = data?.signIn?.token;
    if (token && user) {
      setUser(user);
      setToken(token);
      await saveToken(token);
      router.replace("/(tabs)");
    }
  };

  useEffect(() => {
    if (!loading && data) {
      handleSignInCompleted();
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
              {t("sign_in.title")}
            </Typography>
            <Typography color="secondary">
              {t("sign_in.description")}
            </Typography>
          </View>
        </Flex>
        <Flex gap={3}>
          <Flex gap={2.5}>
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
                  helperText={handleGetErrorMessage(field?.name, {
                    min: 9,
                    max: 9,
                  })}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <PasswordInput
                  {...field}
                  required
                  size="lg"
                  error={!!error}
                  textContentType="password"
                  label={t("labels.password")}
                  autoComplete="current-password"
                  placeholder={t("placeholders.password")}
                  helperText={handleGetErrorMessage(field?.name)}
                />
              )}
            />
          </Flex>
          <Link href="/forgot-password">
            <Typography
              align="right"
              size="text-sm"
              color="primary"
              weight="semibold"
            >
              {t("sign_in.forgot_password")}
            </Typography>
          </Link>
          <Button
            size="lg"
            loading={loading}
            onPress={handleSubmit(handleSignIn)}
          >
            {t("sign_in.actions.sign_in")}
          </Button>
        </Flex>
        <Flex
          gap={0.5}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography size="text-sm" color="secondary">
            {t("sign_in.not_have_account")}
          </Typography>
          <Link href="/sign-up">
            <Typography size="text-sm" color="primary" weight="semibold">
              {t("sign_in.actions.sign_up")}
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
