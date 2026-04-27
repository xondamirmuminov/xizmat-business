import dayjs from "dayjs";
import { isNil, isEmpty } from "lodash";

import { cleanTypeName, ReactNativeFile } from "@/lib/helpers";
import { ServiceImageSnapshot, ServiceFormValuesType } from "@/types";

const isRemoteAssetUri = (uri?: string) =>
  !!uri && (uri.startsWith("http://") || uri.startsWith("https://"));

export const normalizeServiceFormValuesForUpdate = (
  values: ServiceFormValuesType,
  imageSnapshot: ServiceImageSnapshot,
) => {
  const { hours, title, price, images, minutes, categoryId, primaryImage, durationMinutes } =
    values;

  const totalMinutes = Number(hours) * 60 + Number(minutes);
  const resolvedDuration = durationMinutes || totalMinutes;

  const nextPrimaryUri = primaryImage?.uri;
  const primaryFile =
    nextPrimaryUri && !isRemoteAssetUri(nextPrimaryUri)
      ? new ReactNativeFile({
          uri: nextPrimaryUri,
          type: primaryImage?.mimeType || "image/jpeg",
          name: primaryImage?.fileName || `service-primary-${dayjs().format()}`,
        })
      : undefined;

  const currentGalleryUris = (images || [])
    .map((a) => a?.uri)
    .filter(Boolean) as string[];
  const removedImages = (imageSnapshot.images || []).filter(
    (url) => !currentGalleryUris.includes(url),
  );
  const addedImages = (images || [])
    .filter((a) => a?.uri && !isRemoteAssetUri(a.uri))
    .map(
      (image) =>
        new ReactNativeFile({
          uri: image!.uri!,
          type: image?.mimeType || "image/jpeg",
          name: image?.fileName || `service-gallery-${dayjs().format()}`,
        }),
    );

  return {
    price,
    title: cleanTypeName(title),
    durationMinutes: resolvedDuration,
    ...(categoryId ? { categoryId } : {}),
    ...(primaryFile ? { primaryImage: primaryFile } : {}),
    ...(removedImages.length ? { removedImages } : {}),
    ...(addedImages.length ? { addedImages } : {}),
  };
};

export const normalizeServiceFormValuesForSubmission = (
  values: ServiceFormValuesType,
) => {
  const {
    hours,
    title,
    images,
    minutes,

    primaryImage,
    durationMinutes,
    ...data
  } = values;

  delete data?.category;

  const primaryImageFile = !isNil(primaryImage)
    ? new ReactNativeFile({
        uri: primaryImage?.uri,
        type: primaryImage?.mimeType || "",
        name: primaryImage?.fileName || `service-image-${dayjs().format()}`,
      })
    : undefined;

  const imagesFiles = !isEmpty(images)
    ? images?.map(
        (image) =>
          new ReactNativeFile({
            uri: image?.uri,
            type: image?.mimeType || "",
            name: image?.fileName || `service-image-${dayjs().format()}`,
          }),
      )
    : [];

  const totalMinutes = Number(hours) * 60 + Number(minutes);

  return {
    ...data,
    images: imagesFiles,
    title: cleanTypeName(title),
    primaryImage: primaryImageFile,
    durationMinutes: durationMinutes || totalMinutes,
  };
};
