import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { EditProfile } from "@/features/edit-profile";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: t("edit_profile.title") });
  }, [navigation, t]);

  return <EditProfile />;
}
