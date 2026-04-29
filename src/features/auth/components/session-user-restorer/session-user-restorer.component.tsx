import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "@/store";
import { deleteToken } from "@/lib/helpers";

import { ME_QUERY } from "../../api/me.query";
import { toUserFromMe, type MeGqlType } from "../../utils/map-me-to-user";

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
      setUser(toUserFromMe(data.me));
    }
  }, [data, setUser]);

  useEffect(() => {
    if (!error) return;
    signOut();
    void deleteToken();
  }, [error, signOut]);

  return null;
}
