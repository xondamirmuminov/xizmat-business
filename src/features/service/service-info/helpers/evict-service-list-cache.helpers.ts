import type { ApolloCache } from "@apollo/client";

import { ServiceType, PageInfoType } from "@/types";

import { SERVICES_QUERY } from "../../services/api";

export function evictServiceFromListCache(
  cache: ApolloCache,
  businessId: string,
  serviceId: string,
) {
  const existing = cache.readQuery<{
    services: { items: ServiceType[]; pageInfo: PageInfoType };
  }>({ query: SERVICES_QUERY, variables: { limit: 30, businessId } });
  if (!existing?.services) return;
  const items = (existing.services.items || []).filter(
    (s) => s?._id !== serviceId,
  );
  const total = existing.services.pageInfo?.totalItems ?? 0;
  cache.writeQuery({
    query: SERVICES_QUERY,
    variables: { limit: 30, businessId },
    data: {
      services: {
        items,
        pageInfo: {
          ...existing.services.pageInfo,
          totalItems: Math.max(0, total - 1),
        },
      },
    },
  });
  const entityId = cache.identify({
    _id: serviceId,
    __typename: "ProviderService",
  });
  if (entityId) {
    cache.evict({ id: entityId });
    cache.gc();
  }
}
