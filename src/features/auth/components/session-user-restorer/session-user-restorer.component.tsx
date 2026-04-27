import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "@/store";
import { deleteToken } from "@/lib/helpers";
import { UserType, UserRoleEnum } from "@/types";

import { ME_QUERY } from "../../api/me.query";

type MeGqlType = {
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

function toUserType(me: MeGqlType): UserType {
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

type MeQueryData = { me: MeGqlType };

/**
 * `token` is read from SecureStore; `user` is persisted in MMKV. If those diverge
 * (e.g. user cleared, token still valid), `me` repopulates `user` so provider-scoped
 * queries (which need `user._id`) can run.
 */
export function SessionUserRestorer() {
  const { user, token, setUser, signOut } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      token: s.token,
      setUser: s.setUser,
      signOut: s.signOut,
    })),
  );

  const { data, error } = useQuery<MeQueryData>(ME_QUERY, {
    skip: !token || !!user?._id,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.me) {
      setUser(toUserType(data.me));
    }
  }, [data, setUser]);

  useEffect(() => {
    if (!error) return;
    signOut();
    void deleteToken();
  }, [error, signOut]);

  return null;
}
