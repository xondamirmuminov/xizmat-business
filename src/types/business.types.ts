import { Dayjs } from "dayjs";
import { ImagePickerAsset } from "expo-image-picker";

import { UserType } from "./user.types";
import { CategoryType } from "./category.types";
import { CoordinatesType } from "./common.types";

export type WorkingHoursType = {
  to: number;
  from: number;
};

export type SocialMediaLinksType = {
  tiktok?: string;
  youtube?: string;
  website?: string;
  telegram?: string;
  facebook?: string;
  instagram?: string;
};

export type BusinessType = {
  _id: string;
  name: string;
  logo?: string;
  city?: string;
  images: string[];
  address?: string;
  province?: string;
  isActive: boolean;
  provider: UserType;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
  isBlocked?: boolean;
  description?: string;
  workingDays: string[];
  isRecommended: boolean;
  phoneNumbers: string[];
  coords?: CoordinatesType;
  createdByAdmin?: boolean;
  categories: CategoryType[];
  isProviderAvailable?: boolean;
  workingHours?: WorkingHoursType;
  socialMediaLinks?: SocialMediaLinksType;
};

export type BusinessFormWorkingDayType = {
  value: string;
  isClosed: boolean;
};

export type BusinessFormWorkingHoursType = {
  to: Dayjs;
  from: Dayjs;
};

export type BusinessFormValuesType = {
  address?: string;
  businessName: string;
  categoryIds: string[];
  phoneNumbers: string[];
  logo?: ImagePickerAsset;
  coords?: CoordinatesType;
  images: ImagePickerAsset[];
  thumbnail?: ImagePickerAsset;
  socialMediaLinks?: SocialMediaLinksType;
  workingDays: BusinessFormWorkingDayType[];
  workingHours: BusinessFormWorkingHoursType;
};
