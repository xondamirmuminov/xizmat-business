import { View } from "react-native";
import { useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NetworkStatus } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@apollo/client/react";
import { StyleSheet } from "react-native-unistyles";
import { Link, Stack, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlusIcon } from "@/assets";
import { useAuthStore } from "@/store";
import { fragmentRegistry } from "@/graphql";
import { ServiceType, PageInfoType } from "@/types";
import {
  Flex,
  Empty,
  Button,
  ServiceCard,
  ServiceCardSkeleton,
} from "@/components";

import { SERVICES_QUERY, SERVICE_CARD_FRAGMENT } from "./api";

fragmentRegistry.register(SERVICE_CARD_FRAGMENT);

export function Services() {
  const { businessId } = useAuthStore();
  const isMounted = useRef(false);
  const isManualRefetch = useRef(false);

  const { t } = useTranslation();

  const { data, loading, refetch, networkStatus } = useQuery<{
    services: { items: ServiceType[]; pageInfo: PageInfoType };
  }>(SERVICES_QUERY, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 30,
      businessId,
    },
  });

  const handleRefresh = async () => {
    isManualRefetch.current = true;
    await refetch();
    isManualRefetch.current = false;
  };

  const renderServicesSkeleton = () => {
    return (
      <Flex gap={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ServiceCardSkeleton key={"service-skeleton" + index} />
        ))}
      </Flex>
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }

      refetch();
    }, [refetch]),
  );

  const services = data?.services?.items;
  const refreshing =
    isManualRefetch.current && networkStatus === NetworkStatus.refetch;

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: t("services.title"),
            headerRight: () => (
              <Link asChild href="/create-service">
                <Button
                  color="secondary"
                  radius="circular"
                  variant="outlined"
                  startIcon={<PlusIcon />}
                />
              </Link>
            ),
          }}
        />
        <FlashList
          data={services}
          initialScrollIndex={0}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          keyExtractor={(service) => service?._id}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          ListEmptyComponent={loading ? renderServicesSkeleton() : <Empty />}
          renderItem={({ item: service }) => <ServiceCard service={service} />}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create(({ space, colors }) => ({
  safeArea: {
    flex: 1,
  },
  listContainer: { flex: 1, paddingBlock: space(3), paddingInline: space(2) },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
}));
