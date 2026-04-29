import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { ChangePassword } from "@/features/change-password";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: t("change_password.title") });
  }, [navigation, t]);

  return <ChangePassword />;
}
