export type LocalizedTextType = {
  en: string;
  uz: string;
  ru: string;
};

export type CoordinatesType = {
  latitude: number;
  longitude: number;
};

export type RecentLocationType = {
  name: string;
  city?: string;
  placeId: string;
  address?: string;
  latitude: number;
  country?: string;
  longitude: number;
  province?: string;
  displayName: string;
};

export type PageInfoType = {
  perPage: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export enum FavoriteTypeEnum {
  SERVICE = "SERVICE",
  BUSINESS = "BUSINESS",
}

export type TimeSlotType = {
  endAt: Date;
  startAt: Date;
};
