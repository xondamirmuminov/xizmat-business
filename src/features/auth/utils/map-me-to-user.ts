import { UserType, UserRoleEnum } from "@/types";

export type MeGqlType = {
  _id: string;
  role: string;
  phone: string;
  avatar: string;
  fullName: string;
  isBlocked: boolean;
  blockedAt?: string;
  telegramId?: string;
  blockReason?: string;
  expoPushTokens: string[];
  isPhoneConfirmed: boolean;
  lastCoords: null | { lat: number; lon: number };
};

export function toUserFromMe(me: MeGqlType): UserType {
  return {
    _id: me._id,
    phone: me.phone,
    avatar: me.avatar,
    currentLocation: "",
    fullName: me.fullName,
    isBlocked: me.isBlocked,
    telegramId: me.telegramId,
    blockReason: me.blockReason,
    role: me.role as UserRoleEnum,
    expoPushTokens: me.expoPushTokens,
    isPhoneConfirmed: me.isPhoneConfirmed,
    blockedAt: me.blockedAt ? new Date(me.blockedAt) : undefined,
    lastCoords: me.lastCoords
      ? { lat: me.lastCoords.lat, lon: me.lastCoords.lon }
      : undefined,
  };
}
