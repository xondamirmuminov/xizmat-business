import dayjs, { Dayjs } from "dayjs";
import { isNil, isEmpty } from "lodash";

import { SocialMediaLinksType, BusinessFormValuesType } from "@/types";
import { ReactNativeFile, formatPhoneNumberForSubmit } from "@/lib/helpers";

export const SOCIAL_MEDIA_STARTER_LINKS: SocialMediaLinksType = {
  website: "https://",
  telegram: "https://t.me/",
  tiktok: "https://www.tiktok.com/",
  youtube: "https://www.youtube.com/@",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
};

const getSocialMediaLinks = (socialMediaLinks?: SocialMediaLinksType) => {
  if (socialMediaLinks) {
    const socialMediaLinksEntries = Object.entries(socialMediaLinks);
    const formattedSocialMediaLinks = socialMediaLinksEntries?.map(
      (socialMediaLinkEntry) => {
        const [key, value] = socialMediaLinkEntry;

        return [
          key,
          value
            ? SOCIAL_MEDIA_STARTER_LINKS[key as keyof SocialMediaLinksType] +
              value
            : value,
        ];
      },
    );

    return Object.fromEntries(formattedSocialMediaLinks);
  }

  return undefined;
};

const timeToFloat = (time: Dayjs) => {
  return time?.hour() + time?.minute() / 60;
};

export const normalizeBusinessFormValuesForSubmission = (
  values: BusinessFormValuesType,
) => {
  const {
    logo,
    images,
    thumbnail,
    workingDays,
    workingHours,
    phoneNumbers,
    businessName,
    socialMediaLinks,
    ...data
  } = values;

  const formattedPhoneNumbers = phoneNumbers?.map((phoneNumber) =>
    formatPhoneNumberForSubmit(phoneNumber),
  );

  const formattedWorkingDays = workingDays
    ?.filter((workingDay) => !workingDay?.isClosed)
    .map((workingDay) => workingDay?.value);

  const formattedWorkingHours = {
    to: timeToFloat(workingHours?.to),
    from: timeToFloat(workingHours?.from),
  };

  const formattedSocialMediaLinks = getSocialMediaLinks(socialMediaLinks);

  const logoFile = !isNil(logo)
    ? new ReactNativeFile({
        uri: logo?.uri,
        type: logo?.mimeType || "",
        name: logo?.fileName || `logo-${dayjs().format()}`,
      })
    : undefined;

  const thumbnailFile = !isNil(thumbnail)
    ? new ReactNativeFile({
        uri: thumbnail?.uri,
        type: thumbnail?.mimeType || "",
        name: thumbnail?.fileName || `thumbnail-${dayjs().format()}`,
      })
    : undefined;

  const imagesFiles = !isEmpty(images)
    ? images?.map(
        (image) =>
          new ReactNativeFile({
            uri: image?.uri,
            type: image?.mimeType || "",
            name: image?.fileName || `thumbnail-${dayjs().format()}`,
          }),
      )
    : [];

  return {
    ...data,
    logo: logoFile,
    name: businessName,
    images: imagesFiles,
    thumbnail: thumbnailFile,
    workingDays: formattedWorkingDays,
    workingHours: formattedWorkingHours,
    phoneNumbers: formattedPhoneNumbers,
    socialMediaLinks: formattedSocialMediaLinks,
  };
};
