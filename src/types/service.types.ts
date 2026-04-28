import { ImagePickerAsset } from "expo-image-picker";

import { BusinessType } from "./business.types";
import { CategoryType } from "./category.types";
import { LocalizedTextType } from "./common.types";

export type ServiceType = {
  _id: string;
  price: number;
  isActive: boolean;
  /** Gallery image URLs (may overlap with primary). Omitted in list views that do not request it. */
  images?: string[];
  businessId: string;
  providerId: string;
  /** ISO strings from GraphQL `Date` */
  createdAt?: string;
  updatedAt?: string;
  categoryId?: string;
  isFavorite: boolean;
  primaryImage: string;
  description?: string;
  business: BusinessType;
  isRecommended: boolean;
  category?: CategoryType;
  durationMinutes: number;
  title: LocalizedTextType;
};

export enum ServiceSortByEnum {
  NEAREST = "NEAREST",
  CHEAPEST = "CHEAPEST",
  MOST_RECOMMENDED = "MOST_RECOMMENDED",
}

export type ServicesFiltersType = {
  search?: string;
  priceTo?: number;
  openNow?: boolean;
  distance?: number;
  priceFrom?: number;
  sortBy?: ServiceSortByEnum;
};

export type ServiceImageSnapshot = {
  images: string[];
  primaryImage?: string;
};

export type ServiceFormValuesType = {
  price: number;
  hours: number;
  minutes: number;
  categoryId: string;
  durationMinutes: number;
  category?: CategoryType;
  title: LocalizedTextType;
  images?: ImagePickerAsset[];
  primaryImage?: ImagePickerAsset;
};
