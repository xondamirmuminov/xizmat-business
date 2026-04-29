import dayjs, { Dayjs } from "dayjs";
import { isNil, isEmpty } from "lodash";
import type { ImagePickerAsset } from "expo-image-picker";

import { DEFAULT_WORKING_DAYS } from "@/lib/constants";
import {
  CoordinatesType,
  SocialMediaLinksType,
  BusinessFormValuesType,
} from "@/types";
import {
  ReactNativeFile,
  cleanPhone,
  formatPhoneNumberForSubmit,
} from "@/lib/helpers";

const REMOTE_URI_RE = /^https?:\/\//i;

/** Expo pickers use file/content URIs; edit form may hold existing CDN URLs for display only. */
const isLocalPickedAssetUri = (uri: string | undefined) =>
  !!uri && !REMOTE_URI_RE.test(uri);

export const remoteImageUrlToFormAsset = (url: string): ImagePickerAsset => {
  const fileName = url.split("/").pop() || "image";
  return {
    uri: url,
    width: 0,
    height: 0,
    type: "image",
    fileName,
  };
};

/** Matches `PhoneInput`: form state is local subscriber digits only (9), not masked text. */
const storedPhoneToFormLocalDigits = (stored: string) => {
  const digits = cleanPhone(stored);
  if (digits.startsWith("998") && digits.length > 9) {
    return digits.slice(3, 12);
  }
  return digits.slice(0, 9);
};

export const SOCIAL_MEDIA_STARTER_LINKS: SocialMediaLinksType = {
  website: "https://",
  telegram: "https://t.me/",
  tiktok: "https://www.tiktok.com/",
  youtube: "https://www.youtube.com/@",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
};

const getSocialMediaLinks = (
  socialMediaLinks?: SocialMediaLinksType,
): SocialMediaLinksType | undefined => {
  if (!socialMediaLinks) {
    return undefined;
  }

  const out: Partial<SocialMediaLinksType> = {};

  (
    Object.entries(socialMediaLinks) as [
      keyof SocialMediaLinksType,
      string | undefined,
    ][]
  ).forEach(([key, value]) => {
    if (!value?.trim()) {
      return;
    }
    out[key] = SOCIAL_MEDIA_STARTER_LINKS[key] + value;
  });

  return Object.keys(out).length > 0
    ? (out as SocialMediaLinksType)
    : undefined;
};

/** Backend `WorkingHoursInput` uses GraphQL Int (whole hours 0–23), not fractional hours. */
const workingHourToInput = (time: Dayjs | undefined, fallback: number) => {
  if (!time?.isValid()) {
    return fallback;
  }
  return Math.min(23, Math.max(0, time.hour()));
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
  logo?: string;
  thumbnail?: string;
  images?: string[];
  address?: string;
  workingDays: string[];
  phoneNumbers: string[];
  coords?: CoordinatesType;
  categories?: { _id: string }[];
  workingHours?: { to: number; from: number };
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
    images:
      business.images?.filter(Boolean).map(remoteImageUrlToFormAsset) ?? [],
    workingDays,
    logo: business.logo ? remoteImageUrlToFormAsset(business.logo) : undefined,
    socialMediaLinks,
    thumbnail: business.thumbnail
      ? remoteImageUrlToFormAsset(business.thumbnail)
      : undefined,
    coords: business.coords,
    address: business.address,
    businessName: business.name,
    categoryIds: business.categories?.map((c) => c._id) ?? [],
    phoneNumbers: business.phoneNumbers?.map((p) =>
      storedPhoneToFormLocalDigits(p),
    ) ?? [""],
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

  const rawCoords = values.coords;
  const coordsForInput =
    rawCoords != null &&
    typeof rawCoords.latitude === "number" &&
    typeof rawCoords.longitude === "number"
      ? { latitude: rawCoords.latitude, longitude: rawCoords.longitude }
      : undefined;

  const data: Record<string, unknown> = {
    name: n.name,
    address: n.address,
    coords: coordsForInput,
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
    from: workingHourToInput(workingHours?.from, 9),
    to: workingHourToInput(workingHours?.to, 19),
  };

  const formattedSocialMediaLinks = getSocialMediaLinks(socialMediaLinks);

  const logoFile =
    !isNil(logo) && isLocalPickedAssetUri(logo.uri)
      ? new ReactNativeFile({
          uri: logo.uri,
          type: logo.mimeType || "image/jpeg",
          name: logo.fileName || `logo-${dayjs().format()}`,
        })
      : undefined;

  const thumbnailFile =
    !isNil(thumbnail) && isLocalPickedAssetUri(thumbnail.uri)
      ? new ReactNativeFile({
          uri: thumbnail.uri,
          type: thumbnail.mimeType || "image/jpeg",
          name: thumbnail.fileName || `thumbnail-${dayjs().format()}`,
        })
      : undefined;

  const imagesFiles =
    images
      ?.filter((image) => image?.uri && isLocalPickedAssetUri(image.uri))
      .map(
        (image) =>
          new ReactNativeFile({
            uri: image.uri,
            type: image.mimeType || "image/jpeg",
            name: image.fileName || `gallery-${dayjs().format()}`,
          }),
      ) ?? [];

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
