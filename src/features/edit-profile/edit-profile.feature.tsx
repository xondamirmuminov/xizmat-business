import dayjs from "dayjs";
import { Image } from "expo-image";
import { View } from "react-native";
import { toast } from "sonner-native";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native-unistyles";
import { useQuery, useMutation } from "@apollo/client/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller, FieldValues } from "react-hook-form";

import { useAuthStore } from "@/store";
import { AvatarPlaceholder } from "@/assets";
import { ME_QUERY } from "@/features/auth/api/me.query";
import { Flex, Input, Button, Typography } from "@/components";
import { getErrorMessage, ReactNativeFile } from "@/lib/helpers";
import { toUserFromMe, type MeGqlType } from "@/features/auth/utils/map-me-to-user";

import { UPDATE_PROFILE_MUTATION } from "./api";

type MeQuery = { me: MeGqlType };

export function EditProfile() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  const { control, setValue, handleSubmit } = useForm();

  const { t } = useTranslation();
  const setUser = useAuthStore((s) => s.setUser);
  const token = useAuthStore((s) => s.token);

  const { data, loading, refetch } = useQuery<MeQuery>(ME_QUERY, {
    skip: !token,
  });
  const [updateProfile, { loading: updateProfileLoading }] = useMutation(
    UPDATE_PROFILE_MUTATION,
  );

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      setValue("avatar", result.assets[0]);
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUpdate = (values: FieldValues) => {
    const userRow = data?.me;
    const isFullNameUpdated =
      values?.fullName !== userRow?.fullName || values?.avatar;
    const isAvatarUpdated = values?.avatar;
    const updatedFields: { avatar?: unknown; fullName?: string } = {};

    if (isFullNameUpdated) {
      updatedFields.fullName = values?.fullName;
    }

    if (isAvatarUpdated) {
      updatedFields.avatar = new ReactNativeFile({
        uri: values?.avatar?.uri,
        type: values?.avatar?.mimeType,
        name: values?.avatar?.fileName || `avatar-${dayjs().format()}`,
      });
    }

    if (isAvatarUpdated || isFullNameUpdated) {
      updateProfile({
        variables: {
          data: updatedFields,
        },
        onCompleted: async () => {
          const result = await refetch();
          if (result.data?.me) {
            setUser(toUserFromMe(result.data.me));
          }
          setSelectedImage(undefined);
          setValue("avatar", undefined);
          toast.success(t("edit_profile.success_message"));
        },
      });
      return;
    }

    toast.warning(t("messages.no_changes"));
  };

  useEffect(() => {
    if (!loading && data) {
      setValue("fullName", data?.me?.fullName);
    }
  }, [data, loading, setValue]);

  const userRow = data?.me;

  const handleGetErrorMessage = getErrorMessage(t);

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
        <View style={styles.container}>
          <Flex gap={3}>
            <Flex gap={2.5}>
              <Flex gap={1} alignItems="center">
                <Image
                  contentFit="cover"
                  style={styles.avatar}
                  placeholderContentFit="cover"
                  placeholder={AvatarPlaceholder}
                  source={{ uri: selectedImage || userRow?.avatar }}
                />
                <Typography
                  weight="medium"
                  color="primary"
                  onPress={handlePickImage}
                >
                  {t("edit_profile.change_photo")}
                </Typography>
              </Flex>
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
                    helperText={handleGetErrorMessage(error)}
                  />
                )}
              />
            </Flex>
            <Button
              size="lg"
              color="secondary"
              onPress={handleSubmit(handleUpdate)}
              loading={loading || updateProfileLoading}
            >
              {t("edit_profile.actions.update")}
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
  avatar: { width: 100, height: 100, borderRadius: 100 },
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
