import { BusinessType } from "./business.types";
import { LocalizedTextType } from "./common.types";

export type ServiceType = {
  _id: string;
  price: number;
  isActive: boolean;
  businessId: string;
  providerId: string;
  categoryId?: string;
  isFavorite: boolean;
  primaryImage: string;
  description?: string;
  business: BusinessType;
  isRecommended: boolean;
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
