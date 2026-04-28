import dayjs, { Dayjs } from "dayjs";
import { isNil, isEmpty } from "lodash";

import { DEFAULT_WORKING_DAYS } from "@/lib/constants";
import { CoordinatesType, SocialMediaLinksType, BusinessFormValuesType } from "@/types";
import {
  ReactNativeFile,
  formatPhoneNumber,
  formatPhoneNumberForSubmit,
} from "@/lib/helpers";

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

const stripSocialHandle = (
  url: null | string | undefined,
  key: keyof SocialMediaLinksType,
) => {
  if (!url) {
    return "";
  }
  const starter = SOCIAL_MEDIA_STARTER_LINKS[key];
  if (starter && url.startsWith(starter)) {
    return url.slice(starter.length);
  }
  return url;
};

export type BusinessEditFormSource = {
  name: string;
  address?: string;
  workingDays: string[];
  phoneNumbers: string[];
  coords?: CoordinatesType;
  categories?: { _id: string }[];
  workingHours?: { to: number; from: number; };
  socialMediaLinks?: null | SocialMediaLinksType;
};

export const mapBusinessToFormValues = (
  business: BusinessEditFormSource,
): BusinessFormValuesType => {
  const workingDays = DEFAULT_WORKING_DAYS.map((d) => ({
    value: d.value,
    isClosed: !business.workingDays?.includes(d.value),
  }));

  const fromH = business.workingHours?.from ?? 9;
  const toH = business.workingHours?.to ?? 19;
  const social = business.socialMediaLinks;

  const socialMediaLinks: SocialMediaLinksType = {
    tiktok: stripSocialHandle(social?.tiktok, "tiktok"),
    website: stripSocialHandle(social?.website, "website"),
    youtube: stripSocialHandle(social?.youtube, "youtube"),
    telegram: stripSocialHandle(social?.telegram, "telegram"),
    facebook: stripSocialHandle(social?.facebook, "facebook"),
    instagram: stripSocialHandle(social?.instagram, "instagram"),
  };

  return {
    images: [],
    workingDays,
    logo: undefined,
    socialMediaLinks,
    thumbnail: undefined,
    coords: business.coords,
    address: business.address,
    businessName: business.name,
    categoryIds: business.categories?.map((c) => c._id) ?? [],
    phoneNumbers:
      business.phoneNumbers?.map((p) => formatPhoneNumber(p)) ?? [""],
    workingHours: {
      to: dayjs().hour(toH).minute(0).second(0).millisecond(0),
      from: dayjs().hour(fromH).minute(0).second(0).millisecond(0),
    },
  };
};

export const normalizeBusinessFormValuesForUpdate = (
  values: BusinessFormValuesType,
) => {
  const n = normalizeBusinessFormValuesForSubmission(values);

  const data: Record<string, unknown> = {
    name: n.name,
    address: n.address,
    coords: values.coords,
    workingDays: n.workingDays,
    phoneNumbers: n.phoneNumbers,
    workingHours: n.workingHours,
    categoryIds: values.categoryIds,
    socialMediaLinks: n.socialMediaLinks,
  };

  if (n.logo) {
    data.logo = n.logo;
  }
  if (n.thumbnail) {
    data.thumbnail = n.thumbnail;
  }
  if (!isEmpty(n.images)) {
    data.addedImages = n.images;
  }

  return data;
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
