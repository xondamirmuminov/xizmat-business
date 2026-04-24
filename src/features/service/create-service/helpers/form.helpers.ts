import dayjs from "dayjs";
import { isNil, isEmpty } from "lodash";

import { ServiceFormValuesType } from "@/types";
import { cleanTypeName, ReactNativeFile } from "@/lib/helpers";

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
