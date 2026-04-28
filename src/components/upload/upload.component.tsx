import { Image } from "expo-image";
import { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { isNil, isArray, isEqual } from "lodash";
import { StyleSheet } from "react-native-unistyles";

import { TrashIcon, UploadIcon, ImagePlaceholder } from "@/assets";

import { Flex } from "../flex";
import { Button } from "../button";
import { UploadPropsType } from "./types";
import { Typography } from "../typography";

export function Upload({
  value,
  disabled,
  onChange,
  multiple = false,
}: UploadPropsType) {
  const initialImages =
    !isNil(value) && !isArray(value) ? [value] : value || [];

  const [images, setImages] =
    useState<ImagePicker.ImagePickerAsset[]>(initialImages);
  const [isImagePickerOpening, setIsImagePickerOpening] = useState(false);

  const { t } = useTranslation();

  const handlePickImage = async () => {
    setIsImagePickerOpening(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ["images"],
      allowsEditing: !multiple,
      allowsMultipleSelection: multiple,
    });

    setIsImagePickerOpening(false);

    if (!result.canceled) {
      onChange?.(multiple ? result.assets : result.assets[0]);

      setImages((prev) => [...prev, ...result?.assets]);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setImages((prev) => prev.filter((image) => image?.uri !== imageUrl));

    const filteredImages = images.filter((image) => image?.uri !== imageUrl);
    onChange?.(multiple ? filteredImages : null);
  };

  useEffect(() => {
    const initialImages =
      !isNil(value) && !isArray(value) ? [value] : value || [];

    if (initialImages?.length && isEqual(initialImages, images)) {
      setImages(initialImages);
    }
  }, [value]);

  return (
    <Flex gap={1.5} direction="row" flexWrap="wrap">
      {!multiple && images?.length ? (
        <Flex key={images[0]?.uri} style={styles.imageCard}>
          <View style={styles.removeButton}>
            <Button
              size="sm"
              variant="ghost"
              color="secondary"
              radius="circular"
              startIcon={<TrashIcon />}
              onPress={() => handleRemoveImage(images[0]?.uri)}
            />
          </View>
          <Image
            contentFit="cover"
            style={styles.image}
            placeholderContentFit="cover"
            placeholder={ImagePlaceholder}
            source={{ uri: images[0]?.uri }}
          />
        </Flex>
      ) : (
        <Pressable
          onPress={handlePickImage}
          disabled={isImagePickerOpening || disabled}
        >
          <Flex
            gap={1}
            alignItems="center"
            justifyContent="center"
            style={styles.uploadCard}
          >
            <UploadIcon style={styles.uploadIcon} />
            <Typography size="text-sm" weight="medium">
              {t("actions.upload")}
            </Typography>
          </Flex>
        </Pressable>
      )}
      {multiple &&
        images?.map((image) => (
          <Flex key={image?.uri} style={styles.imageCard}>
            <View style={styles.removeButton}>
              <Button
                size="sm"
                variant="ghost"
                color="secondary"
                radius="circular"
                startIcon={<TrashIcon />}
                onPress={() => handleRemoveImage(image?.uri)}
              />
            </View>
            <Image
              contentFit="cover"
              style={styles.image}
              source={{ uri: image?.uri }}
              placeholderContentFit="cover"
              placeholder={ImagePlaceholder}
            />
          </Flex>
        ))}
    </Flex>
  );
}

const styles = StyleSheet.create(({ colors }) => ({
  imageCard: { position: "relative" },
  image: { width: 110, height: 110, borderRadius: 8 },
  uploadIcon: { width: 18, height: 18, color: colors.textPrimary },
  removeButton: { top: 4, right: 4, zIndex: 9, position: "absolute" },
  uploadCard: {
    width: 110,
    height: 110,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "dashed",
    borderColor: colors.slate8,
  },
}));
