export enum UserRoleEnum {
  USER = "USER",
  SUPER_ADMIN = "SUPER_ADMIN",
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
}

export type UserLastCoordsType = {
  lat: number;
  lon: number;
};

export type UserType = {
  _id: string;
  phone: string;
  avatar: string;
  fullName: string;
  blockedAt?: Date;
  role: UserRoleEnum;
  isBlocked: boolean;
  telegramId?: string;
  blockReason?: string;
  currentLocation: string;
  expoPushTokens: string[];
  isPhoneConfirmed: boolean;
  lastCoords?: UserLastCoordsType;
};
